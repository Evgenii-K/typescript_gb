import { Places } from './search-form'

export function fromApi (): Promise<Places[]> {

  const result = fetch('/places')
  .then(res => res.json())
  .then(data => {
    if (typeof data === 'string') {
      throw new Error
    }

    let res = []
    for(let key in data) {
      res.push(data[key])
    }

    return res
  })
  .catch(err => {
    return err
  })

  return result
}