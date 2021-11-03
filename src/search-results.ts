import { renderBlock } from './lib.js'
import { Places } from './search-form'
import { renderUserBlock, getUserData, getFavoritesAmount } from './user.js';

function isPlaces(value: unknown): value is Places {
  return typeof value === 'object'
    && 'id' in value
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

  let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems'))

  resultArr.forEach(result => {

    if (!isPlaces(result)) return

    const id = result.id
    const image = result.image || ''
    const name = result.name
    const price = result.price
    const remoteness = result.remoteness
    const description = result.description
    let active: string = ''

    if(favoriteItems[id]) {
      active = 'active'
    }

    const block = `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites ${active}" id="${id}"></div>
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

  if (renderResult) toggleFavoriteItem(resultArr)
}

export function toggleFavoriteItem(resultArr: Places[]): void {
  const buttons = document.querySelectorAll('.favorites')

  buttons.forEach(button => {
    button.addEventListener('click', (event: Event): void => {
      const id: string = event.target.id

      let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems'))

      if (event.target.classList.contains('active')) {
        delete favoriteItems[id]
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
        event.target.classList.remove('active')
        return
      }

      if(!favoriteItems) favoriteItems = {}

      const hotel = resultArr.find(result => result.id == id)

      favoriteItems[id] = {
        id: hotel.id,
        name: hotel.name,
        image: hotel.image
      }

      event.target.classList.add('active')
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
    })
  })
}
