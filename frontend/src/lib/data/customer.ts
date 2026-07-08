"use server"

const notImplementedResult: any = {
  success: false,
  error: "Backend-native account endpoints are not implemented yet.",
}

export const retrieveCustomer = async (..._args: any[]) => null
export const updateCustomer = async (..._args: any[]) => notImplementedResult
export async function signup(..._args: any[]) {
  return "Backend-native account registration is not implemented yet."
}
export async function login(..._args: any[]) {
  return "Backend-native login is not implemented yet."
}
export async function signout(..._args: any[]) {}
export async function transferCart(..._args: any[]) {}
export const addCustomerAddress = async (..._args: any[]) => notImplementedResult
export const deleteCustomerAddress = async (..._args: any[]) => notImplementedResult
export const updateCustomerAddress = async (..._args: any[]) => notImplementedResult
