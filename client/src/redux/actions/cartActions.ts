import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import { RootStore } from '../../utils/Interface'
import { ALERT, IAlertType } from '../types/alertTypes'
import { ADD_TO_CART, IAddToCartType } from './../types/cartTypes'

export const addToCart = (
  id: string,
  color: string,
  size: number,
  qty: number,
  token: string
) => async(dispatch: Dispatch<IAddToCartType | IAlertType>, getState: () => RootStore) => {
  let accessToken = ''
  if (token) {
    const tokenExpResult = await checkTokenExp(token, dispatch)
    accessToken = tokenExpResult ? tokenExpResult : token
  }

  try {
    const res = await getDataAPI(`product/${id}`)
    const product = res.data.product
    console.log(product)

    dispatch({
      type: ADD_TO_CART,
      payload: {
        _id: id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        qty,
        color,
        size
      }
    })

    if (token) {
      await postDataAPI('cart', { product: id, color, size, qty }, accessToken)
    } else {
      localStorage.setItem('sneakershub_cartItems', JSON.stringify(getState().cart))
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