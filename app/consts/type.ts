"use client";

export type TODO = any;

export enum OrderOrOffer {
  ORDER = 'Order',
  OFFER = 'Offer'
}

export enum BUYER_ORDER_STATUS {
  CANCELLED = 'Cancelled',
  REQUESTED = 'Requested',
  WAITING_FOR_DEPOSIT =  'Waiting For Deposit',
  DEPOSITED = 'Deposited',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
}

export enum SELLER_ORDER_STATUS {
  NEW = 'New',
  APPROVED = 'Approved',
  COMPLETED = 'Completed',
}

export enum CLAIM_ORDER_STATUS {
  WAITING_FOR_REDEEM = 'Waiting for Redeem',
  REDEEMED = 'Redeemed',
  CLAIMED = 'Claimed',  
}

export const BUYER_ORDER_STATUS_TO_BTN_TEXT = {
  [BUYER_ORDER_STATUS.CANCELLED]: '',
  [BUYER_ORDER_STATUS.REQUESTED]: 'Cancel',
  [BUYER_ORDER_STATUS.WAITING_FOR_DEPOSIT]: 'Deposit',
  [BUYER_ORDER_STATUS.DEPOSITED]: 'Confirm',
  [BUYER_ORDER_STATUS.CONFIRMED]: 'Complete',
  [BUYER_ORDER_STATUS.COMPLETED]: 'Rate',
};

export const SELLER_ORDER_STATUS_TO_BTN_TEXT = {
  [SELLER_ORDER_STATUS.NEW]: 'Approve',
  [SELLER_ORDER_STATUS.APPROVED]: 'Completed',
  [SELLER_ORDER_STATUS.COMPLETED]: 'Rate',
};

export const CLAIM_ORDER_STATUS_TO_BTN_TEXT = {
  [CLAIM_ORDER_STATUS.WAITING_FOR_REDEEM]: 'Redeem',
  [CLAIM_ORDER_STATUS.REDEEMED]: 'Claim',
  [CLAIM_ORDER_STATUS.CLAIMED]: ''
};