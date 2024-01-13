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
  const numTags = Math.floor(Math.random() * (maxTags - minTags + 1) + minTags)

  const selectedTags = availableTags.slice(0, numTags)

  return selectedTags.map((tag, index) => ({
    id: index.toString(),
    name: tag,
    slug: tag,
  }))
}
