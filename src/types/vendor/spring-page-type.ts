type SpringPageType<T> = {
  content: Array<T>,
  totalPages: number,
  totalElements: number,
  size: number,
  number: number,
  first: boolean,
  last: boolean
}

export default SpringPageType;
