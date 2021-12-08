import { Places } from './search-form'
import { renderSearchResultsBlock } from './search-results.js'

export function resultsFilter(resultArr: Places[]): void {

  const filter = document.querySelector('.search-results-filter')

  if(!filter) return

  const button = filter.querySelector('span')
  const selector = filter.querySelector('select')

  type KeysOfPlaces = keyof Places

  function isKeysOfPlaces (value: string): value is KeysOfPlaces {
    return ['id', 'name', 'description', 'image', 'remoteness', 'bookedDates', 'price'].includes(value)
  }
  
  enum searchParams {
    cheap = 'price',
    expensive = 'reverse',
    name = 'name'
  }

  type KeysOfSearchParams = keyof typeof searchParams

  function isSearchParamsIncludes (value: string): value is KeysOfSearchParams {
    return Object.keys(searchParams).some((v) => v === value)
  }

  function byField(field: keyof Places ) {

    return (a: Places, b: Places): number => {

      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return a[field]! > b[field]! ? 1 : -1
      }

      return -1
  }}

  function listener (): void {

      if(!selector) return

      const selected: string = selector.value

      if (!isSearchParamsIncludes(selected)) return
      
      const field: string = searchParams[selected]

      if (isKeysOfPlaces(field) || field !== 'reverse') return

      const sorted: Places[] = field === 'reverse'
        ? resultArr.sort(byField('price')).reverse()
        : resultArr.sort(byField(field))
  
      renderSearchResultsBlock(sorted)
  }

    button?.addEventListener('click', listener)
}