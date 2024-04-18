
"use client";

import moment from "moment";
import { TransactionHistoryTable } from "../components/Table";
import { OrderOrOffer } from "../consts/type";
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
      buyerStatus: "REQUESTED",
      sellerStatus: "-",
      createdAt: moment().subtract(15, 'minutes').toISOString(),
    },
    {
      orderId: "123",
      productName: "Apple MacBook Pro 17\"",
      userName: "Sliver",
      fromNetwork: CHAIN_TYPE.SOLANA,
      toNetwork: CHAIN_TYPE.SOLANA,
      price: "$1999",
      buyerStatus: "DEPOSITED",
      sellerStatus: "ACCEPTED",
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