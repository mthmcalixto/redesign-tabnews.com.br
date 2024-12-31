export const getRandomTags = (minTags: number, maxTags: number): any[] => {
  const availableTags = [
    'javascript',
    'react',
    'nodejs',
    'typescript',
    'css',
    'html',
    'webdev',
    'programming',
    'hackernews',
    'openai',
    'ai',
    'datascience',
    'machinelearning',
  ]

  const numTags = Math.floor(Math.random() * (maxTags - minTags + 1)) + minTags

  const selectedTags = []
  for (let i = 0; i < numTags; i++) {
    const randomIndex = Math.floor(Math.random() * availableTags.length)
    selectedTags.push(availableTags[randomIndex])
  }

  const uniqueTags = [...new Set(selectedTags)]

  return uniqueTags.map((tag, index) => ({
    id: index.toString(),
    name: tag,
    slug: tag,
  }))
}
