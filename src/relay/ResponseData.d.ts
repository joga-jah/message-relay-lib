/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface ResponseData {
  statusCode: number
  data?: { [key: string]: any }
  message?: string
}
