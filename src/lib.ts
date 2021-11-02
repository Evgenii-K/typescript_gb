export function renderBlock(elementId, html) {
  const element = document.getElementById(elementId);
  element.innerHTML = html;
}

export function renderToast(message, action) {
  let messageText = '';

  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `;
  }

  renderBlock('toast-block', messageText);

  const button = document.getElementById('toast-main-action');
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler();
      }
      renderToast(null, null);
    };
  }
}

export class GetCheckDate {

  readonly today: Date = new Date()
  readonly year: number = new Date().getFullYear()
  readonly month: number = new Date().getMonth() + 1
  readonly day: number = new Date().getDate()

  LastDayOfNextMonth() {
    if (this.month > 11) {
      return new Date(this.year + 1, 0, 0).getDate();
    } 
    
    return new Date(this.year, this.month + 1, 0).getDate();
  }

  minDayOfCheck() {
    return `${this.year}-${this.month}-${this.day < 10 ? '0' + this.day : this.day}`
  }

  maxDayOfCheck() {
    const day = this.LastDayOfNextMonth()
    if (this.month > 11) {
      return `${this.year + 1}-${1}-${day}`
    } 

    return `${this.year}-${this.month + 1}-${day}`
  }

  placeholder(DaysOfBooking: number) {
    const date = this.today
    date.setDate(date.getDate() + DaysOfBooking);
    const day = date.getDate()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${day < 10 ? '0' + day : day}`
  }
}
