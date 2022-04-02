import Xendit from 'xendit-node'
import dotenv from 'dotenv'

dotenv.config({
  path: './server/config/.env'
})

const xenditObj = new Xendit({
  secretKey: `${process.env.XENDIT_SECRET_KEY}`
})

enum Currency {
  IDR = 'IDR'
}

enum ChannelCode {
  ID_OVO = 'ID_OVO'
}

const { EWallet } = xenditObj
const eWalletSpecificOptions = {}
const wallet = new EWallet(eWalletSpecificOptions)

export const createOvoTransaction = async(amount: number, mobileNumber: string, refId: string) => {
  try {
    const resp = await wallet.createEWalletCharge({
      referenceID: refId,
      currency: Currency.IDR,
      amount: Math.trunc(amount),
      checkoutMethod: 'ONE_TIME_PAYMENT',
      channelCode: ChannelCode.ID_OVO,
      channelProperties: {
        mobileNumber
      },
      metadata: {
        branch_code: 'tree_branch'
      }
    })
  
    return resp
  } catch (err: any) {
    console.log(err)
  }
}

export const getChargeStatus = async(id: string) => {
  try {
    const resp = await wallet.getEWalletChargeStatus({
      chargeID: id
    })

    return resp
  } catch (err: any) {
    console.log(err)
  }
}