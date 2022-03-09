import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { uploadImages } from '../../utils/imageHelper'
import { ALERT, IAlertType } from './../types/alertTypes'
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, ICreateProductType, IDeleteProductType, IGetProductType, IProductData, IUpdateProductType, UPDATE_PRODUCT } from './../types/productTypes'

export const createProduct = (productData: IProductData, token: string) => async(dispatch: Dispatch<ICreateProductType | IAlertType>) => {
  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token

  try {
    const imageUploadResult = await uploadImages(productData.images as File[], 'product')

    const res = await postDataAPI('product', { ...productData, images: imageUploadResult }, accessToken)
    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data.product
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

export const getProduct = () => async(dispatch: Dispatch<IGetProductType | IAlertType>) => {
  try {
    const res = await getDataAPI('product')
    dispatch({
      type: GET_PRODUCT,
      payload: res.data.products
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

export const deleteProduct = (id: string, token: string) => async(dispatch: Dispatch<IDeleteProductType | IAlertType>) => {
  const tokenExpRes = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpRes ? tokenExpRes : token

  try {
    const res = await deleteDataAPI(`product/${id}`, accessToken)
    dispatch({
      type: DELETE_PRODUCT,
      payload: id
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

export const updateProduct = (productData: IProductData, token: string) => async(dispatch: Dispatch<IUpdateProductType | IAlertType>) => {
  const oldImages = productData.images.filter(img => img.toString().match(/image/i))
  const newImages = productData.images.filter(img => !img.toString().match(/image/i))

  const tokenExpResult = await checkTokenExp(token, dispatch)
  const accessToken = tokenExpResult ? tokenExpResult : token
  try {
    let newImagesUrl = []

    if (newImages.length !== 0) {
      newImagesUrl = await uploadImages(newImages, 'product')
    }
    
    const res = await patchDataAPI(`product/${productData._id}`, { ...productData, images: [ ...oldImages, ...newImagesUrl ] }, accessToken)
    dispatch({
      type: UPDATE_PRODUCT,
      payload: res.data.product
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err: any) {
    console.log(err)
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}