import { renderBlock } from './lib.js'

export interface User {
  username: string;
  avatarUrl: string;
}

function isUser(value: unknown): value is User {
  return typeof value === 'object'
    && 'username' in value
    && 'avatarUrl' in value
}

export function getUserData (): User {
  const res = localStorage.getItem('user')
  
  let user: unknown = JSON.parse(res)

  if (isUser(user)) {
    return user
  }

  return ({username: '', avatarUrl: ''})
}

export function getFavoritesAmount (): number {
  const res = localStorage.getItem('favoriteItems')

  if(!res) return 0

  let favorite: unknown = JSON.parse(res)

  if (typeof favorite === 'object') {
    return Object.keys(favorite).length
  }
  
  return 0
}

export function renderUserBlock ({ username, avatarUrl }: User, favoriteItemsAmount?: number) {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarUrl}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${username}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}