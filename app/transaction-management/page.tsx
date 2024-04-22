
"use client";

import moment from "moment";
import { TransactionHistoryTable } from "../components/Table";
import { BUYER_ORDER_STATUS, SELLER_ORDER_STATUS, OrderOrOffer } from "../consts/type";
import { CHAIN_TYPE } from "../consts/chain";


export function TransactionHistory() {
  const data = [
    {
      orderId: "123",
      productName: "Apple MacBook Pro 17\"",
      userName: "Sliver",
      fromNetwork: CHAIN_TYPE.SOLANA,
      toNetwork: CHAIN_TYPE.MOONBEAM,
      price: "$1999",
      buyerStatus: BUYER_ORDER_STATUS.DEPOSITED,
      sellerStatus: SELLER_ORDER_STATUS.APPROVED,
      createdAt: moment().subtract(15, 'minutes').toISOString(),
    },
    {
      orderId: "123",
      productName: "Apple MacBook Pro 17\"",
      userName: "Sliver",
      fromNetwork: CHAIN_TYPE.SOLANA,
      toNetwork: CHAIN_TYPE.SOLANA,
      price: "$1999",
      buyerStatus: BUYER_ORDER_STATUS.CONFIRMED,
      sellerStatus: SELLER_ORDER_STATUS.APPROVED,
      createdAt: moment().subtract(5, 'days').toISOString(),
    },
    {
      orderId: "123",
      productName: "Apple MacBook Pro 17\"",
      userName: "Sliver",
      fromNetwork: CHAIN_TYPE.SOLANA,
      toNetwork: CHAIN_TYPE.SOLANA,
      price: "$1999",
      buyerStatus: BUYER_ORDER_STATUS.COMPLETED,
      sellerStatus: SELLER_ORDER_STATUS.COMPLETED,
      createdAt: moment().subtract(5, 'days').toISOString(),
    },
  ]
  return (
    <div>
      <TransactionHistoryTable orderOrOffer={OrderOrOffer.OFFER} data={data} />
      <hr className="my-5"/>
      <TransactionHistoryTable orderOrOffer={OrderOrOffer.ORDER} data={data} />
    </div>
  );
}

export default TransactionHistory