import { renderBlock } from './lib.js'

export function getUserData (): object {
  const user: any = localStorage.getItem('user')
  
  if (user) {
    return user.json()
  }

  return ({})
}

export function getFavoritesAmount (): number {
  let favorite: any = localStorage.getItem('favoritesAmount')

  if (favorite) {
    favorite = Number(favorite.json().favoritesAmount)
  }

  if (isNaN(favorite)) {
    return 0
  }
  
  return favorite
}

export function renderUserBlock (userName: string, avatar: string, favoriteItemsAmount?: number) {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatar}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
