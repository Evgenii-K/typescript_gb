import { Places } from './search-form'
import { renderSearchResultsBlock } from './search-results.js'

export function resultsFilter(resultArr: Places[]): void {
  const filter = document.querySelector('.search-results-filter')
  const button = filter.querySelector('span')
  const selector = filter.querySelector('select')

  enum searchParams {
    cheap = 'price',
    expensive = 'reverse',
    name = 'name'
  }

  function byField(field: string) {
    return (a: Places, b: Places): number => a[field] > b[field] ? 1 : -1
  }

  function listener (): void {

      const field: string = searchParams[selector.value]

      const sorted: Places[] = field === 'reverse'
        ? resultArr.sort(byField('price')).reverse()
        : resultArr.sort(byField(field))

      renderSearchResultsBlock(sorted)
  }

    button?.addEventListener('click', listener)
}