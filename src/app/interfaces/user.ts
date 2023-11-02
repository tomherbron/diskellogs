import {Record} from "./record";

export interface User {
  email: string,
  firstName: string,
  lastName: string,
  address: string,
  zipCode: string,
  city: string,
  records: Record[]
}
