"use server"

import {
  getOrder as getBackendOrder,
  listOrders as listBackendOrders,
} from "../../api/backend"

export const retrieveOrder = async (id: string): Promise<any> => getBackendOrder(id)

export const listOrders = async (..._args: any[]): Promise<any[]> => listBackendOrders()

export const createTransferRequest = async (
  ..._args: any[]
): Promise<{ success: boolean; error: string | null; order: any | null }> => ({
  success: false,
  error: "Order transfer is not implemented in the backend-native API.",
  order: null,
})

export const acceptTransferRequest = createTransferRequest
export const declineTransferRequest = createTransferRequest
