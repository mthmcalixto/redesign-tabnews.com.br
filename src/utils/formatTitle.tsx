type BadgeProps = {
  content: string
  color: string
}

const Badge = ({ content, color }: BadgeProps) => (
  <span
    className={`inline-block px-2 text-sm text-white rounded-md ${color} lowercase mr-1`}
  >
    {content}
  </span>
)

type ColorItem = {
  key: string
  color: string
}

const colorMap: ColorItem[] = [
  { key: 'PITCH', color: 'bg-blue-500' },
  { key: 'DICA', color: 'bg-yellow-500' },
  { key: 'DÚVIDA', color: 'bg-pink-500' },
]

export const formatTitle = (title: string) => {
  const parts = title.split(/\[([^\]]*)\]/g)
  return parts.map((part, index) => {
    if (index % 2 === 0) {
      return part
    } else {
      const token = part.toUpperCase()
      const colorItem = colorMap.find((item) => item.key === token)
      const color = colorItem ? colorItem.color : 'bg-green-600'
      return <Badge key={index} content={part} color={color} />
    }
  })
}
