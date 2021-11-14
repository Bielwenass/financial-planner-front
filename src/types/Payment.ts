export default interface Payment {
  id: number
  name: string
  amount: number
  categoryId: number | null
  ownerId?: number
  start: string
  end: string
  isMonthly?: boolean
}
