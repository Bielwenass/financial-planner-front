import MonthlyData from './MonthlyData';

export default interface YearlyData {
  year: number
  totalSum: number
  incomesSum: number
  expensesSum: number
  months: Record<string, MonthlyData>
}
