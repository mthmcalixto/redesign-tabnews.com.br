'use server'

import { headers } from 'next/headers'
import ButtonsHeaderC from './ButtonsHeaderC'

export default async function ButtonsPage() {
  const headersList = headers()
  const header_url = (await headersList).get('x-pathname') || ''

  return <ButtonsHeaderC header_url={header_url} />
}
