import { IUserReducer, GET_ALL_USER, IGetAllUserType } from './../types/userTypes'

const initialState = {
  totalPage: 0,
  data: []
}

const userReducer = (state: IUserReducer = initialState, action: IGetAllUserType) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default userReducer