import CardsPosts from '@/components/CardsPosts'
import CardsTrending from '@/components/CardsTrending'

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-10 pt-7">
      <CardsTrending />
      <CardsPosts />
    </main>
  )
}
