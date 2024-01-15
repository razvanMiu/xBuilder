type EditProps = {
  contentPath: string
}

export default function Edit({ contentPath }: EditProps) {
  return (
    <main>
      <h1>Edit {contentPath}</h1>
    </main>
  )
}
