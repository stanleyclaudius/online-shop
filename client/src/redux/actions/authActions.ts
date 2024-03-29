import { Dispatch } from 'redux'
import { IEditProfile, IUserLogin, IUserRegister } from './../../utils/Interface'
import { getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
import { uploadImages } from './../../utils/imageHelper'
import { AUTH, IAuth, IAuthType } from './../types/authTypes'
import { ALERT, IAlertType } from './../types/alertTypes'
import { checkTokenExp } from './../../utils/checkTokenExp'
import { GET_CART, ICartData, IGetCartType, IResetCartType, RESET_CART } from '../types/cartTypes'
import { GET_WISHLIST, IGetWishlistType, IResetWishlistType, IWishlistData, RESET_WISHLIST } from '../types/wishlistTypes'

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

export const login = (userData: IUserLogin) => async (dispatch: Dispatch<IGetWishlistType | IGetCartType | IAuthType | IAlertType>) => {
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
    if (cartData) {
      if (cartData.length > 0) {
        cartData!.forEach(async(item: ICartData) => {
          await postDataAPI('cart', { product: item._id, color: item.color, size: item.size, qty: item.qty }, res.data.accessToken)
        })
        localStorage.setItem('sneakershub_cartItems', JSON.stringify([]))
      }
    }

    const cartRes = await getDataAPI('cart', res.data.accessToken)
    dispatch({
      type: GET_CART,
      payload: cartRes.data.carts
    })

    const wishlistData = JSON.parse(localStorage.getItem('sneakershub_wishlist') as string)
    if (wishlistData) {
      if (wishlistData.length > 0) {
        wishlistData.forEach(async(item: IWishlistData) => {
          await postDataAPI('wishlist', { product: item.product }, res.data.accessToken)
        })
        localStorage.setItem('sneakershub_wishlist', JSON.stringify([]))
      }
    }

    const wishlistRes = await getDataAPI('wishlist', res.data.accessToken)
    dispatch({
      type: GET_WISHLIST,
      payload: wishlistRes.data.wishlists
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

export const logout = (token: string) => async (dispatch: Dispatch<IResetWishlistType | IResetCartType | IAuthType | IAlertType>) => {
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
      type: RESET_WISHLIST,
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

export const googleLogin = (token: string) => async (dispatch: Dispatch<IGetWishlistType | IGetCartType | IAuthType | IAlertType>) => {
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
    if (cartData) {
      if (cartData.length > 0) {
        cartData!.forEach(async(item: ICartData) => {
          await postDataAPI('cart', { product: item._id, color: item.color, size: item.size, qty: item.qty }, res.data.accessToken)
        })
        localStorage.setItem('sneakershub_cartItems', JSON.stringify([]))
      }
    }

    const cartRes = await getDataAPI('cart', res.data.accessToken)
    dispatch({
      type: GET_CART,
      payload: cartRes.data.carts
    })

    const wishlistData = JSON.parse(localStorage.getItem('sneakershub_wishlist') as string)
    if (wishlistData) {
      if (wishlistData.length > 0) {
        wishlistData.forEach(async(item: IWishlistData) => {
          await postDataAPI('wishlist', { product: item.product }, res.data.accessToken)
        })
        localStorage.setItem('sneakershub_wishlist', JSON.stringify([]))
      }
    }

    const wishlistRes = await getDataAPI('wishlist', res.data.accessToken)
    dispatch({
      type: GET_WISHLIST,
      payload: wishlistRes.data.wishlists
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

export const facebookLogin = (accessToken: string, userID: string) => async(dispatch: Dispatch<IGetWishlistType | IGetCartType | IAuthType | IAlertType>) => {
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
    if (cartData) {
      if (cartData.length > 0) {
        cartData!.forEach(async(item: ICartData) => {
          await postDataAPI('cart', { product: item._id, color: item.color, size: item.size, qty: item.qty }, res.data.accessToken)
        })
        localStorage.setItem('sneakershub_cartItems', JSON.stringify([]))
      }
    }

    const cartRes = await getDataAPI('cart', res.data.accessToken)
    dispatch({
      type: GET_CART,
      payload: cartRes.data.carts
    })

    const wishlistData = JSON.parse(localStorage.getItem('sneakershub_wishlist') as string)
    if (wishlistData) {
      if (wishlistData.length > 0) {
        wishlistData.forEach(async(item: IWishlistData) => {
          await postDataAPI('wishlist', { product: item.product }, res.data.accessToken)
        })
        localStorage.setItem('sneakershub_wishlist', JSON.stringify([]))
      }
    }

    const wishlistRes = await getDataAPI('wishlist', res.data.accessToken)
    dispatch({
      type: GET_WISHLIST,
      payload: wishlistRes.data.wishlists
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

export const editProfile = (data: IEditProfile, auth: IAuth) => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(`${auth.token}`, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : auth.token

  try {
    let avatarRes = []
    if (data.tempAvatar && data.tempAvatar.length > 0) {
      avatarRes = await uploadImages(data.tempAvatar, 'avatar')
    }

    const res = await patchDataAPI('auth/profile', { ...data, avatar: avatarRes.length > 0 ? avatarRes[0] : auth.user?.avatar }, accessToken)
    dispatch({
      type: AUTH,
      payload: {
        user: {
          ...res.data.user,
          password: ''
        },
        token: accessToken
      }
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

export const changePassword = (data: object, token: string) => async(dispatch: Dispatch<IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const res = await patchDataAPI('auth/password', data, accessToken)
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