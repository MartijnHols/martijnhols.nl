const absoluteUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_PRIMARY_HOST}${path}`

export default absoluteUrl
