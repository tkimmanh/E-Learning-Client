interface ILink {
  href: string
  rel: string
  method: string
}

interface IPayment {
  links: ILink[]
}
