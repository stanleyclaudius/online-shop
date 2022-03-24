export const GET_DASHBOARD_DATA = 'GET_DASHBOARD_DATA'

export interface transactionGrowth {
  month: string
  count: number
}

export interface IDashboard {
  totalUser: number
  totalTransaction: number
  totalProduct: number
  totalBrand: number
  totalCategory: number
  monthlyTransaction: transactionGrowth[],
  userGrowth: transactionGrowth[]
}

export interface IGetDashboardDataType {
  type: typeof GET_DASHBOARD_DATA
  payload: IDashboard
}