import Xendit from 'xendit-node'

const xenditObj = new Xendit({
  secretKey: 'xnd_development_XBeVaoP4xPnnwsps6VqCaHjQiLniCQxI8CQUTrhGkjvhqoRXGHJe8pfHto57zdd'
})

const { EWallet } = xenditObj
const eWalletSpecificOptions = {}
const wallet = new EWallet(eWalletSpecificOptions)

export const createOvoTransaction = async(amount: number, mobileNumber: string, refId: string) => {
  try {
    const resp = await wallet.createEWalletCharge({
      referenceID: refId,
      // @ts-ignore
      currency: 'IDR',
      amount: Math.trunc(amount),
      checkoutMethod: 'ONE_TIME_PAYMENT',
      // @ts-ignore
      channelCode: 'ID_OVO',
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