type AddProps = {
  contentPath: string
}

export default function Add({ contentPath }: AddProps) {
  return (
    <main>
      <h1>Add {contentPath}</h1>
    </main>
  )
}
