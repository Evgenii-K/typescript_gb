import { renderBlock } from './lib.js'
import { Places } from './search-form'
import { resultsFilter } from './results-filter.js'

function isPlaces(value: unknown): value is Places {
  return typeof value === 'object'
    && value !== null
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

interface FavoriteItem {
  id: string;
  name: string;
  image: string;
}

interface FavoriteItems {
  [id: string]: FavoriteItem
}

function isItemOfFavorite (value: unknown): value is FavoriteItem {
  return typeof value === 'object'
    && value !== null
    && 'id' in value
    && 'name' in value
    && 'image' in value
}

function isFavoriteItem (values: Array<unknown>): boolean {
  values.forEach(value => {
    if (!isItemOfFavorite(value)) return false
  })

  return true
}

function isFavoriteItems(value: unknown): value is FavoriteItems {

  if (typeof value === 'object') {
    if(!value) return false
    const porp = Object.values(value)

    return typeof value === 'object' && isFavoriteItem(porp)
  }

  return false
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

  let favoriteItems = getFavoriteItems()

  let renderResult = ''

  resultArr.forEach((result: Places) => {

    if (!isPlaces(result)) return

    const id = result.id
    const image = result.image[0] || ''
    const name = result.name
    const price = result.price
    const remoteness = result.remoteness
    const description = result.description
    let active: string = ''

    if(isFavoriteItems(favoriteItems) && favoriteItems[id]) {
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
                <option value="cheap">Сначала дешёвые</option>
                <option value="expensive">Сначала дорогие</option>
                <option value="name">По названию</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      ${renderResult}
    </ul>
    `
  )
  
  toggleFavoriteItem(resultArr, favoriteItems)
  resultsFilter(resultArr)
}

export function getFavoriteItems(): FavoriteItems | Object {
  const res = localStorage.getItem('favoriteItems')

  if(res) {
    let favoriteItems: unknown = JSON.parse(res)

    if(isFavoriteItems(favoriteItems)) {
      return favoriteItems
    } 
  }

  localStorage.setItem('favoriteItems', JSON.stringify({}))

  return ({})
}

export function toggleFavoriteItem(resultArr: Places[], favoriteItems: FavoriteItems | Object): void {
  const buttons = document.querySelectorAll('.favorites')

  function listener (event: Event ): void {
    const target = event.target as HTMLButtonElement

    const id: string = target.id

    if (target.classList.contains('active')) {
      
      target.classList.remove('active')

      if(isFavoriteItems(favoriteItems) && favoriteItems[id]) {
        delete favoriteItems[id]
      }
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
      
      return
    }

    const hotel: Places | undefined = resultArr.find(result => result.id == id)

    if (hotel) {

      let hotelImage = hotel.image[0]

      if(typeof hotelImage !== 'string') {
        hotelImage = ''
      }

      if(isFavoriteItems(favoriteItems) && favoriteItems[id]) {
        favoriteItems[id] = {
          id: hotel.id,
          name: hotel.name,
          image: hotelImage
        }
      }
    }

    target.classList.add('active')
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems))
  }

  buttons.forEach((button: Element | null) => {
    button?.addEventListener('click', listener)
  })
}
