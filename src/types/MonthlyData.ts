import Payment from './Payment';

export default interface MonthlyData {
  totalSum: number
  incomesSum: number
  expensesSum: number
  payments: Array<Payment>
}
