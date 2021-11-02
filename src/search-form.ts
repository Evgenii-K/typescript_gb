import { renderBlock, GetCheckDate } from './lib.js'
import { renderEmptyOrErrorSearchBlock, renderSearchResultsBlock } from './search-results.js';


interface SearchFormData {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  price: number;
}

export interface Places {
  id: string;
  name: string;
  description: string;
  image?: string;
  remoteness: number;
  bookedDates?: Array<any>;
  price: number
}

export function renderSearchFormBlock (): void {

  const min = new GetCheckDate().minDayOfCheck();
  const max = new GetCheckDate().maxDayOfCheck();

  const checkInPlaceholder = new GetCheckDate().placeholder(1);
  const checkOutPlaceholder = new GetCheckDate().placeholder(3);

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${checkInPlaceholder}" min="${min}" max="${max}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${checkOutPlaceholder}" min="${min}" max="${max}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}

export function search (result: (data: SearchFormData) => void, cb: (res: string | Places[]) => void) {
  const form = document.querySelector('form');

  if (form != null) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const city: string = (<HTMLInputElement>document.querySelector('#city')).value;
      const checkInDate: string = (<HTMLInputElement>document.querySelector('#check-in-date')).value;
      const checkOutDate: string = (<HTMLInputElement>document.querySelector('#check-out-date')).value;
      const price: number = +(<HTMLInputElement>document.querySelector('#max-price')).value;
      
      result({city, checkInDate, checkOutDate, price})

      fetch('/places')
      .then(res => res.json())
      .then(data => cb(data))
      .catch(err => cb(err))
    })
  } else {
    result({city: '', checkInDate: '', checkOutDate: '', price: 0})
  }
}

export function getResult (enteredData: SearchFormData): void {
  console.log(enteredData)
}

export function getPlaces (res: string | object): void {

  if(typeof res === 'string') {
    renderEmptyOrErrorSearchBlock(res)
  } else {
    let arr = []
    for(let key in res) {
      arr.push(res[key])
    }
    renderSearchResultsBlock(arr)
  }
}