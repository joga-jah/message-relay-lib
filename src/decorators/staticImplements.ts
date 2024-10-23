/* eslint-disable no-unused-expressions */
export default function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor
  }
}
