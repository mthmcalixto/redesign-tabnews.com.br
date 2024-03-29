export function formatCreatedAt(timeInput: number | string): string {
  let timestamp: number

  if (typeof timeInput === 'string') {
    timestamp = Math.floor(new Date(timeInput).getTime() / 1000)
  } else {
    timestamp = timeInput
  }

  const now = Math.floor(Date.now() / 1000)
  const secondsAgo = now - timestamp

  const intervals = [
    { label: 'y', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
    { label: 's', seconds: 1 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds)

    if (count >= 1) {
      return `${count}${interval.label} ago`
    }
  }

  return 'now'
}
