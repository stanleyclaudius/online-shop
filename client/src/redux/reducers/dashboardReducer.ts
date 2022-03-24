import { GET_DASHBOARD_DATA, IDashboard, IGetDashboardDataType } from './../types/dashboardTypes'

const initialState = {
  totalUser: 0,
  totalTransaction: 0,
  totalProduct: 0,
  totalBrand: 0,
  totalCategory: 0,
  monthlyTransaction: [],
  userGrowth: []
}

const dashboardReducer = (state: IDashboard = initialState, action: IGetDashboardDataType) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return action.payload
    default:
      return state
  }
}

export default dashboardReducer