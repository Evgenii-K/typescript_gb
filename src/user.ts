/*
Написать две функции. 
+Первая getUserData, которая читает из localStorage ключ user.
+Подразумевается, что ключ содержит объект с полями username и avatarUrl. 
+Вторая функция getFavoritesAmount, которая читает из lacalStorage ключ favoritesAmount. 
+Ключ должен содержать количество предметов, добавленных пользователем в избранное. 
+Для обеих функций применить подход с unknown, чтобы валидировать содержимое localStorage.
+Написать функцию renderUserBlock, которая принимает имя пользователя, ссылку на аватар
*/

import { renderBlock } from './lib.js'

interface User {
  username: string;
  avatarUrl: string;
}

interface Avatar {
  favoritesAmount: number
}

function isUser(value: unknown): value is User {
  return typeof value === 'object'
    && 'userName' in value
    && 'avatarURL' in value
}

function isAvatar(value: unknown): value is Avatar {
  return typeof value === 'object'
    && 'favoritesAmount' in value
}

export function getUserData (): object {
  const res = localStorage.getItem('user')
  
  let user: unknown = JSON.parse(res)

  if (isUser(user)) {
    return user
  }

  return ({username: '', avatarUrl: ''})
}

export function getFavoritesAmount (): number {
  const res = localStorage.getItem('favoritesAmount')

  let favorite: unknown = JSON.parse(res)

  if (isAvatar(favorite)) {
    return favorite.favoritesAmount
  }
  
  return 0
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
