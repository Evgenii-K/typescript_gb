import { Places } from './search-form'

export function resultsFilter(resultArr: Places[]): void {
  const filter = document.querySelector('.search-results-filter')
  const button = filter.querySelector('span')
  const selector = filter.querySelector('select')

  

  function listener (): void {

      console.log(resultArr);

      console.log('selector: ', selector.value)
  }

    button?.addEventListener('click', listener)
}