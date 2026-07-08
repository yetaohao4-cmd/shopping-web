"use server"

export const listCartPaymentMethods = async (..._args: any[]) => {
  return [
    {
      id: "backend_manual_payment",
      is_enabled: true,
    },
  ]
}
