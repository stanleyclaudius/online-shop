import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { deleteDataAPI, getDataAPI, postDataAPI } from '../../utils/fetchData'
import { RootStore } from '../../utils/Interface'
import { ALERT, IAlertType } from '../types/alertTypes'
import { IProductData } from '../types/productTypes'
import { ADD_WISHLIST, DELETE_WISHLIST_ITEM, GET_WISHLIST, IAddWishlistType, IDeleteWishlistItemType, IGetWishlistType } from '../types/wishlistTypes'

export const addWishlist = (product: IProductData, token: string) => async(dispatch: Dispatch<IAddWishlistType | IAlertType>, getState: () => RootStore) => {
  let accessToken = ''
  if (token) {
    const tokenExpResult = await checkTokenExp(token, dispatch)
    accessToken = tokenExpResult ? tokenExpResult : token
  }

  try {
    dispatch({
      type: ADD_WISHLIST,
      payload: {
        product
      }
    })

    if (token) {
      await postDataAPI('wishlist', { product: product._id }, accessToken)
    } else {
      localStorage.setItem('sneakershub_wishlist', JSON.stringify(getState().wishlist))
    }
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response
      }
    })
  }
}

export const getWishlist = (token: string) => async(dispatch: Dispatch<IGetWishlistType | IAlertType>) => {
  let accessToken = ''
  if (token) {
    const tokenExpResult = await checkTokenExp(token, dispatch)
    accessToken = tokenExpResult ? tokenExpResult : token
  }

  try {
    const res = await getDataAPI('wishlist', accessToken)
    dispatch({
      type: GET_WISHLIST,
      payload: res.data.wishlists
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}

export const deleteWishlistItem = (id: string, token: string) => async(dispatch: Dispatch<IDeleteWishlistItemType | IAlertType>, getState: () => RootStore) => {
  let accessToken = ''
  if (token) {
    const tokenExpResult = await checkTokenExp(token, dispatch)
    accessToken = tokenExpResult ? tokenExpResult : token
  }

  try {
    dispatch({
      type: DELETE_WISHLIST_ITEM,
      payload: id
    })

    if (token) {
      await deleteDataAPI(`wishlist/${id}`, accessToken)
    } else {
      localStorage.setItem('sneakershub_wishlist', JSON.stringify(getState().wishlist))
    }
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}