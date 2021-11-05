import { SearchFormData } from './search-form'

export interface IDatabaseItems {
  id: string
  title: string
  details: string
  photos: string[]
  coordinates: number[]
  bookedDates: any[]
  price: number
}

type formattedFlat = Omit<IDatabaseItems, 'price'> 

interface IFormattedFlat extends formattedFlat {
  totalPrice: number
}

export const database: IDatabaseItems[]
export const backendPort: number
export const localStorageKey: string
export const url: string

export function cloneDate(date: Date): Date
export function addDays(date: Date, days: number): Date

export class FlatRentSdk {
  
  get(id: string): Promise<IDatabaseItems|null>

  search(parameters: SearchFormData): Promise<IFormattedFlat[]|string>

  book(flatId: string, checkInDate: Date, checkOutDate: Date): Promise<number|string>

  _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date) : void

  _resetTime(date: Date): void

  _calculateDifferenceInDays(startDate: Date, endDate: Date): number

  _generateDateRange(from: Date, to: Date): Date[]

  _generateTransactionId(): number

  _areAllDatesAvailable(flat: IDatabaseItems[], dateRange: Date[]): Date[]

  _formatFlatObject(flat: IDatabaseItems[], nightNumber: number): Date[]

  _readDatabase(): null | IDatabaseItems[]

  _writeDatabase(database: IDatabaseItems[]): void

  _syncDatabase(database: IDatabaseItems[]): void
}