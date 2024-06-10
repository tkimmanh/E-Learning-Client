export interface ICourse {
  name: string
  description: string
  price: number
  paid: boolean | string
  image: string | FileList
}
