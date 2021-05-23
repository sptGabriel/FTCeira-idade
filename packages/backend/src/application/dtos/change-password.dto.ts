export type ChangePasswordDTO = {
  oldPassword: string
  password: string
  confirmPassword: string
}
export type AdminChangePasswordDTO = {
  password: string
  confirmPassword: string
  targetId: string
}
