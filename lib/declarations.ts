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

export type { SignUpFormData, PostOtpData, SignInData }