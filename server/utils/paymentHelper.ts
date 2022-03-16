import Xendit from 'xendit-node'

const xenditObj = new Xendit({
  secretKey: `${process.env.XENDIT_SECRET_KEY}`
})

const { EWallet } = xenditObj
const eWalletSpecificOptions = {}
const wallet = new EWallet(eWalletSpecificOptions)

export const createOvoTransaction = async(amount: number, mobileNumber: string, refId: string) => {
  const resp = await wallet.createEWalletCharge({
    referenceID: refId,
    // @ts-ignore
    currency: 'IDR',
    amount,
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
}