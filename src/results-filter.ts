import { Places } from './search-form'
import { renderSearchResultsBlock } from './search-results.js'

export function resultsFilter(resultArr: Places[]): void {

  const filter = document.querySelector('.search-results-filter')

  if(!filter) return

  const button = filter.querySelector('span')
  const selector = filter.querySelector('select')

  

  interface ISearchParams {
    cheap: 'price',
    expensive: 'reverse',
    name: 'name'
  }

  type KeysOfPlace = keyof Places

  type KeyOfSearchPrams = keyof ISearchParams


  function byField(field: KeysOfPlace) {
    return (a: Places, b: Places): number => {

      if (a) return -1
      if (b) return -1

      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return a[field] > b[field] ? 1 : -1
      }

      return -1
  }}

  function listener (): void {

      if(!selector) return

      const en: KeyOfSearchPrams = selector.value as KeyOfSearchPrams

      const field: searchParams = searchParams[en]

      if (!searchParams.hasOwnProperty(selector.value)) {
        return
      }
        
      

      const sorted: Places[] = field === 'reverse'
        ? resultArr.sort(byField('price')).reverse()
        : resultArr.sort(byField(field))

  
      renderSearchResultsBlock(sorted)
  }

    button?.addEventListener('click', listener)
}