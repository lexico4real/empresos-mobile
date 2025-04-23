type SignUpFormData = {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  // securityQuestion: string
  // securityAnswer: string
  password: string
}

type PostOtpData = {
  email: string
  password: string
}

type SignInData = {
  email: string
  password: string
  otp: string
  secret: string
}

type PostIntlTransactionData = {
  senderAccount: string
  senderName: string
  receiverAccount: string
  receiverBankName: string
  receiverBankSwiftCode: string
  receiverName: string
  receiverCountry: string
  currency: string
  amount: number
}

export type { PostIntlTransactionData, PostOtpData, SignInData, SignUpFormData }
