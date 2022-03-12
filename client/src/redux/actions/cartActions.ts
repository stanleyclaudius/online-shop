import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { deleteDataAPI, getDataAPI, postDataAPI } from '../../utils/fetchData'
import { RootStore } from '../../utils/Interface'
import { ALERT, IAlertType } from '../types/alertTypes'
import { ADD_TO_CART, DELETE_CART_ITEM, GET_CART, IAddToCartType, IDeleteCartData, IDeleteCartItemType, IGetCartType } from './../types/cartTypes'

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

    dispatch({
      type: ADD_TO_CART,
      payload: {
        _id: id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        qty,
        color,
        product,
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

export const getCart = (token: string) => async(dispatch: Dispatch<IGetCartType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await getDataAPI('cart', accessToken)
    dispatch({
      type: GET_CART,
      payload: res.data.carts
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

export const deleteItem = (cartData: IDeleteCartData) => async(dispatch: Dispatch<IDeleteCartItemType | IAlertType>, getState: () => RootStore) => {
  let accessToken = ''
  if (cartData.token) {
    const tokenExpResult = await checkTokenExp(cartData.token, dispatch)
    accessToken = tokenExpResult ? tokenExpResult : cartData.token
  }

  try {
    dispatch({
      type: DELETE_CART_ITEM,
      payload: cartData
    })

    if (cartData.token) {
      await deleteDataAPI(`cart/${cartData.productId}/${cartData.productColor.substring(1,cartData.productColor.length)}/${cartData.productSize}`, accessToken)
    } else {
      localStorage.setItem('sneakershub_cartItems', JSON.stringify(getState().cart))
    }
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: err.response.data.msg
    })
  }
}