import { Dispatch } from 'redux'
import { RootStore } from '../../utils/Interface'
import { ALERT, IAlertType } from '../types/alertTypes'
import { ADD_WISHLIST, IAddWishlistType } from '../types/wishlistTypes'

export const addWishlist = (product: string) => async(dispatch: Dispatch<IAddWishlistType | IAlertType>, getState: () => RootStore) => {
  try {
    dispatch({
      type: ADD_WISHLIST,
      payload: {
        product
      }
    })

    localStorage.setItem('sneakershub_wishlist', JSON.stringify(getState().wishlist))
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}