export async function getPots(): Promise<any[]> {
  const res = await fetch(
    `https://www.tabnews.com.br/api/v1/contents?page=1&per_page=70&strategy=relevant`,
    { next: { revalidate: 50 } }
  )
  const posts = (await res.json()) as any[]

  const popularTags = [
    { id: '1', name: 'javascript', slug: 'javascript' },
    { id: '2', name: 'react', slug: 'react' },
    { id: '3', name: 'nodejs', slug: 'nodejs' },
    { id: '4', name: 'typescript', slug: 'typescript' },
    { id: '5', name: 'python', slug: 'python' },
  ]

  const postsWithData: any[] = posts.map((post) => {
    const randomIndex = Math.floor(Math.random() * popularTags.length)
    const randomTag = popularTags[randomIndex]

    return {
      ...post,
      views: Math.floor(Math.random() * 100001),
      comments: post.children_deep_count,
      createdAt: post.created_at,
      tags: [
        {
          id: randomTag.id,
          name: randomTag.name,
          slug: randomTag.slug,
        },
      ],
      user: {
        id: post.owner_id,
        username: post.owner_username,
        name: post.owner_username,
      },
    }
  })

  return postsWithData
}
