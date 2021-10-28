export default interface Payment {
  id: number
  name: string
  amount: number
  ownerId?: number
  start: string
  end: string
  isMonthly?: boolean
}
