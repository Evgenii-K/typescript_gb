import { renderBlock, GetCheckDate } from './lib.js'
import { renderEmptyOrErrorSearchBlock, renderSearchResultsBlock } from './search-results.js';

export interface SearchFormData {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  price?: number;
}

export interface Places {
  id: string;
  name: string;
  description: string;
  image: string[];
  remoteness: number;
  bookedDates?: Array<any>;
  price: number
}

export function renderSearchFormBlock (): void {

  const getCheckDate = new GetCheckDate()

  const min = getCheckDate.minDayOfCheck();
  const max = getCheckDate.maxDayOfCheck();

  const checkInPlaceholder = getCheckDate.placeholder(1);
  const checkOutPlaceholder = getCheckDate.placeholder(3);

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

export function search (result: (data: SearchFormData) => Promise<Places[]>, cb: () => Promise<Places[]>): void {
  const form = document.querySelector('form');

  if (form != null) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const city: string = (<HTMLInputElement>document.querySelector('#city')).value;
      const checkIn: number = (<HTMLInputElement>document.querySelector('#check-in-date')).valueAsNumber;
      const checkOut: number = (<HTMLInputElement>document.querySelector('#check-out-date')).valueAsNumber;
      const price: number = +(<HTMLInputElement>document.querySelector('#max-price')).value;

      const checkInDate: Date = new Date(checkIn)
      const checkOutDate: Date = new Date(checkOut)

      Promise.all([
        result({city, checkInDate, checkOutDate, price}),
        cb()
      ])
      .then(results => {

        const allResults: Places[] = [...results[0], ...results[1]]
  
        renderSearchResultsBlock(allResults)
      })
      .catch(err => {
        renderEmptyOrErrorSearchBlock('Поиск не дал результата')
        console.log(err)
      })

    })
  } else {
    renderEmptyOrErrorSearchBlock('Поиск не дал результата')
  }
}