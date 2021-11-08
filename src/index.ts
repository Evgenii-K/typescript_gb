import { renderSearchFormBlock, search, getResult, getPlaces } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock, getUserData, getFavoritesAmount } from './user.js';
import { renderToast } from './lib.js';

window.addEventListener('DOMContentLoaded', () => {

  const json = JSON.parse(localStorage.getItem('favoriteItems'))
  if(json === null) localStorage.setItem('favoriteItems', JSON.stringify({}))
  
  const userObject = {username: 'Wade Warren', avatarUrl: './img/avatar.png'}
  localStorage.setItem('user', JSON.stringify(userObject))

  renderUserBlock(getUserData(), getFavoritesAmount());
  renderSearchFormBlock();
  search(getResult, getPlaces);
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
