export interface User {
  userId: number,
  email: string,
  firstName: string,
  lastName: string,
  address: string,
  zipCode: string,
  city: string,
  records: Record[]
}

export interface Record {
  recordId: number,
  ref: string,
  title: string,
  artist: string,
  genre: string,
  price: number,
  releaseYear: Date
}
