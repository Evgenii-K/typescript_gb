import { renderBlock, GetCheckDate } from './lib.js'

/*
Найдите функцию renderSearchFormBlock и доработайте её следующим образом. 
+Функция должна принимать дату въезда и дату выезда. 
+При этом минимальная дата, которую можно выбрать это дата сегодняшнего дня, а максимальная дата - последний день следующего месяца. 
+Будем считать это ограничениями сервиса. 
+По умолчанию поля заполняются следующим образом. 
+Дата въезда это следующий день от текущей даты. Дата выезда - плюс два дня от даты въезда.
*/

export function renderSearchFormBlock () {

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


  const form = document.querySelector('form');
  const checkInDate = (<HTMLInputElement>document.querySelector('#check-in-date')).value;
  const checkOutDate = (<HTMLInputElement>document.querySelector('#check-out-date')).value;

  if (form != null) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      console.log(`Check-in from ${checkInDate} to ${checkOutDate}`);
    })
  }
}
