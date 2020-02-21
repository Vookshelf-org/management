import { NextPage } from 'next'

interface Props {
  className?: string
  userAgent?: string
}

const Page: NextPage<Props> = () => (
  <main>
    <p>index</p>
  </main>
)

export default Page
