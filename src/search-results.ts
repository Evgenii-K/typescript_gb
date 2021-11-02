import { renderBlock } from './lib.js'
import { Places } from './search-form'

function isPlaces(value: unknown): value is Places {
  return typeof value === 'object'
    && 'name' in value
    && 'description' in value
    && 'remoteness' in value
    && 'price' in value
}

export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage: string) {

  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResultsBlock (resultArr: Places[]) {

  let renderResult = ''

  resultArr.forEach(result => {

    if (!isPlaces(result)) return

    const image = result.image || ''
    const name = result.name
    const price = result.price
    const remoteness = result.remoteness
    const description = result.description

    const block = `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites active"></div>
            <img class="result-img" src="${image}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${name}</p>
              <p class="price">${price}p</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${remoteness}км от вас</div>
            <div class="result-info--descr">${description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    `
    renderResult = renderResult + block

  })

  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      ${renderResult}
    </ul>
    `
  )
}
