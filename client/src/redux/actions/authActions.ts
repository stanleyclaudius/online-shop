import { Dispatch } from 'redux'
import { IUserLogin, IUserRegister } from './../../utils/Interface'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'
import { AUTH, IAuthType } from './../types/authTypes'
import { ALERT, IAlertType } from './../types/alertTypes'
import { checkTokenExp } from './../../utils/checkTokenExp'
import { GET_CART, ICartData, IGetCartType, IResetCartType, RESET_CART } from '../types/cartTypes'

export const register = (userData: IUserRegister) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/register', userData)
    
    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
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

export const login = (userData: IUserLogin) => async (dispatch: Dispatch<IGetCartType | IAuthType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/login', userData)
    dispatch({
      type: AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
    })
    localStorage.setItem('sneakershub_firstLogin', 'true')

    const cartData = JSON.parse(localStorage.getItem('sneakershub_cartItems') as string)
    if (cartData!.length > 0) {
      cartData!.forEach(async(item: ICartData) => {
        await postDataAPI('cart', { product: item._id, color: item.color, size: item.size, qty: item.qty }, res.data.accessToken)
      })
      localStorage.setItem('sneakershub_cartItems', JSON.stringify([]))
    }

    const cartRes = await getDataAPI('cart', res.data.accessToken)
    dispatch({
      type: GET_CART,
      payload: cartRes.data.carts
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
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

export const refreshToken = () => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
  const firstLogin = localStorage.getItem('sneakershub_firstLogin')
  if (firstLogin !== 'true') return
  
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })
    
    const res = await postDataAPI('auth/refresh_token', {})
    dispatch({
      type: AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
    })

    dispatch({
      type: ALERT,
      payload: {}
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

export const logout = (token: string) => async (dispatch: Dispatch<IResetCartType | IAuthType | IAlertType>) => {
  const tokenExpRes = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpRes ? tokenExpRes : token

  try {
    const res = await postDataAPI('auth/logout', {}, accessToken)
    dispatch({
      type: AUTH,
      payload: {}
    })
    localStorage.removeItem('sneakershub_firstLogin')

    dispatch({
      type: RESET_CART,
      payload: []
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
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

export const googleLogin = (token: string) => async (dispatch: Dispatch<IGetCartType | IAuthType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/google_login', { token })
    dispatch({
      type: AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
    })
    localStorage.setItem('sneakershub_firstLogin', 'true')

    const cartData = JSON.parse(localStorage.getItem('sneakershub_cartItems') as string)
    if (cartData!.length > 0) {
      cartData!.forEach(async(item: ICartData) => {
        await postDataAPI('cart', { product: item._id, color: item.color, size: item.size, qty: item.qty }, res.data.accessToken)
      })
      localStorage.setItem('sneakershub_cartItems', JSON.stringify([]))
    }

    const cartRes = await getDataAPI('cart', res.data.accessToken)
    dispatch({
      type: GET_CART,
      payload: cartRes.data.carts
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
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

export const facebookLogin = (accessToken: string, userID: string) => async(dispatch: Dispatch<IGetCartType | IAuthType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/facebook_login', { accessToken, userID })
    dispatch({
      type: AUTH,
      payload: {
        user: res.data.user,
        token: res.data.accessToken
      }
    })
    localStorage.setItem('sneakershub_firstLogin', 'true')

    const cartData = JSON.parse(localStorage.getItem('sneakershub_cartItems') as string)
    if (cartData!.length > 0) {
      cartData!.forEach(async(item: ICartData) => {
        await postDataAPI('cart', { product: item._id, color: item.color, size: item.size, qty: item.qty }, res.data.accessToken)
      })
      localStorage.setItem('sneakershub_cartItems', JSON.stringify([]))
    }

    const cartRes = await getDataAPI('cart', res.data.accessToken)
    dispatch({
      type: GET_CART,
      payload: cartRes.data.carts
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
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