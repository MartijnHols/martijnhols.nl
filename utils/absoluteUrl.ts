const absoluteUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_PRIMARY_HOST}${
    path.endsWith('/') ? path.substring(0, path.length - 1) : path
  }`

export default absoluteUrl
