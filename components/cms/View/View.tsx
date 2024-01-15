type ViewProps = {
  contentPath: string
}

export default function View({ contentPath }: ViewProps) {
  return (
    <main>
      <h1>View {contentPath}</h1>
    </main>
  )
}
