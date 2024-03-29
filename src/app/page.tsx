import CardsPosts from '@/components/CardsPosts'
import CardsTrending from '@/components/CardsTrending'
import GoToTopButton from '@/components/GoToTopButton'

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-10 pt-7 px-5 md:px-0">
      <CardsTrending />
      <CardsPosts page={'relevant'} keyPage={'relevant'} />
      <GoToTopButton />
    </main>
  )
}
