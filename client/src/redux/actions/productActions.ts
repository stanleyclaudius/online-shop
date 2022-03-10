import { Dispatch } from 'redux'
import { checkTokenExp } from './../../utils/checkTokenExp'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
import { uploadImages } from './../../utils/imageHelper'
import { ALERT, IAlertType } from './../types/alertTypes'
import {
  GET_PRODUCT,
  GET_HOME_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  IProductData,
  IGetProductType,
  IGetHomeProductType,
  ICreateProductType,
  IUpdateProductType,
  IDeleteProductType
} from './../types/productTypes'

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

export const getHomeProduct = (
  categoryId = '',
  selectedBrand: string[] = [],
  selectedSize: number[] = [],
  selectedColor: string[] = [],
  selectedPrice: number[] = [],
  selectedPage: number = 1
) => async(dispatch: Dispatch<IGetHomeProductType | IAlertType>) => {
  let brandQueryStr = ''
  let sizeQueryStr = ''
  let colorQueryStr = ''

  if (selectedBrand.length > 0) {
    for (let i = 0; i < selectedBrand.length; i++) {
      if (i !== (selectedBrand.length - 1))
        brandQueryStr += `brand=${selectedBrand[i]}&`
      else
        brandQueryStr += `brand=${selectedBrand[i]}`
    }
  }

  if (selectedSize.length > 0) {
    for (let i = 0; i < selectedSize.length; i++) {
      if (i !== (selectedSize.length - 1))
        sizeQueryStr += `sizes=${selectedSize[i]}&`
      else
        sizeQueryStr += `sizes=${selectedSize[i]}`
    }
  }

  if (selectedColor.length > 0) {
    for (let i = 0; i < selectedColor.length; i++) {
      if (i !== (selectedColor.length - 1))
        colorQueryStr += `colors=${selectedColor[i]}&`
      else
        colorQueryStr += `colors=${selectedColor[i]}`
    }
  }

  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    let url = `product/home?category=${categoryId}&${brandQueryStr}&${sizeQueryStr}&${colorQueryStr}&page=${selectedPage}`

    if (selectedPrice.length > 0) {
      url += `&gt=${selectedPrice[0]}&lt=${selectedPrice[1]}`
    }

    const res = await getDataAPI(url)
    dispatch({
      type: GET_HOME_PRODUCT,
      payload: {
        data: res.data.products,
        totalPage: res.data.totalPage,
        maxPrice: res.data.maxPrice,
        minPrice: res.data.minPrice
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