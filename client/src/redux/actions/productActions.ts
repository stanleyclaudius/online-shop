import { Dispatch } from 'redux'
import { checkTokenExp } from '../../utils/checkTokenExp'
import { postDataAPI } from '../../utils/fetchData'
import { uploadImages } from '../../utils/imageHelper'
import { ALERT, IAlertType } from './../types/alertTypes'
import { CREATE_PRODUCT, ICreateProductType, IProductData } from './../types/productTypes'

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