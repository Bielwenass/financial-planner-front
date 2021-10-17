import MonthlyData from './MonthlyData';

export default interface YearlyData {
  totalSum: number
  incomesSum: number
  expensesSum: number
  months: Record<string, MonthlyData>
}
