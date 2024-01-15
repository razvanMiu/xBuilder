import { last, keys } from 'lodash'
import dynamic from 'next/dynamic'

const View = dynamic(() => import('@xBuilder/components/cms/View/View'))
const Edit = dynamic(() => import('@xBuilder/components/cms/Edit/Edit'))
const Add = dynamic(() => import('@xBuilder/components/cms/Add/Add'))

type AppProps = {
  params: {
    parts: string[]
  }
}

const modes = {
  add: Add,
  edit: Edit,
  view: View,
}

export default function App({ params }: AppProps) {
  const modesId = keys(modes)
  const lastPart = last(params.parts)

  const contentPath = modesId.includes(lastPart)
    ? params.parts.join('/')
    : params.parts.slice(0, -1).join('/')

  const Mode = modes[lastPart] || View

  return <Mode contentPath={contentPath} />
}
