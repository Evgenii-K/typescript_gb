import { renderBlock } from './lib.js'

/* 
+Функция должна принимать три аргумента имя пользователя, ссылка на его аватар и количество элементов в избранном. 
+Аргументы должны иметь подходящие для них типы. Аргументы должны использоваться для соответствующих целей. 
+Убедиться, что следующая логика работает верно, а если нет, то внести правки. 
+Если количество избранных объектов меньше одного, то нужно выводить сообщение “ничего нет” и иконка сердечка должны быть не закрашена. 
+Иначе иконка сердечка закрашена и рядом просто выводится количество избранных объектов. Все стили уже присутствуют, необходима только логика. 
*/

export function renderUserBlock (userName: string, avatar: string, favoriteItemsAmount: number) {
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
