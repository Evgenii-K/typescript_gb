import { renderSearchFormBlock, search } from './search-form.js';
import { fromSdk } from './search-from-sdk.js'
import { fromApi } from './search-from-api.js'
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock, getUserData, getFavoritesAmount } from './user.js';
import { renderToast } from './lib.js';

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('favoriteItems')) {
    localStorage.setItem('favoriteItems', JSON.stringify({}))
  }
  
  const userObject = {username: 'Wade Warren', avatarUrl: './img/avatar.png'}
  localStorage.setItem('user', JSON.stringify(userObject))

  renderUserBlock(getUserData(), getFavoritesAmount());
  renderSearchFormBlock();
  search(fromSdk, fromApi);
  renderSearchStubBlock();
  renderToast(
    {
      text: 'Это пример уведомления. Используйте его при необходимости',
      type: 'success',
    },
    {
      name: 'Понял',
      handler: () => {
        console.log('Уведомление закрыто');
      },
    }
  );
});
