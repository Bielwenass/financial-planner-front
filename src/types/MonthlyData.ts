import Payment from './Payment';

export default interface MonthlyData {
  monthNum: number
  totalSum: number
  incomesSum: number
  expensesSum: number
  payments: Array<Payment>
}
