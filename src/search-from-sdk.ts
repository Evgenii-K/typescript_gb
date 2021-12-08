import { FlatRentSdk } from './flat-rent-sdk.js'
import { IFormattedFlat } from './flat-rent-sdk.d'
import { SearchFormData, Places } from './search-form'

export function fromSdk (enteredData: SearchFormData): Promise<Places[]> {

  const sdk = new FlatRentSdk()

  function formatResult(result: IFormattedFlat[]):Places[] {

    const formatOfResult:Places[] = []

    result.forEach((item, key) => {

      let place = {} as Places

      place.id = item.id
      place.name = item.title
      place.description = item.details
      place.image = item.photos
      place.remoteness = 0
      place.bookedDates = item.bookedDates
      place.price = item.totalPrice

      formatOfResult.push(place)
    })

    return formatOfResult
  }

  const result = sdk.search(enteredData)
      .then(result => {
        if (typeof result === 'string') {
          throw new Error
        }
        return formatResult(result)
      })
      .catch(err => {
        return err
      })

  return result

}