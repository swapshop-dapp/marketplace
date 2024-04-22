
"use client";

import { Button, Table, Tooltip } from "flowbite-react";
import { BUYER_ORDER_STATUS_TO_BTN_TEXT, OrderOrOffer, SELLER_ORDER_STATUS_TO_BTN_TEXT, TODO } from "../consts/type";
import moment from "moment";
import { CHAIN_LOGO, ChainTypeValue } from "../consts/chain";
import { BaseImage } from "./BaseImage";

interface Props {
  orderOrOffer: OrderOrOffer,
  data: TODO[]
}

export function TransactionHistoryTable(props: Props) {
  const tableMetadata = [
    {
      name: "Order ID",
      key: "orderId",
      selector: "orderId",
    },
    {
      name: "Product Name",
      key: "productName",
      selector: "productName",
    },
    {
      name:  props.orderOrOffer === OrderOrOffer.OFFER ? "Buyer" : "Seller",
      key: "userName",
      selector: "userName",
    },
    {
      name: "Network",
      key: "network",
      render: (row: TODO) => {
        if (row.fromNetwork === row.toNetwork) {
          return (
              <Tooltip content={row.fromNetwork}>
                  <BaseImage
                      src={CHAIN_LOGO[row.fromNetwork as ChainTypeValue]}
                      width="10"
                      height="10"
                      className="size-5"
                      alt={row.fromNetwork}
                    />
              </Tooltip>
          )
        }
        return (
          <div className="flex gap-3">
              <Tooltip content={row.fromNetwork}>
                  <BaseImage
                    src={CHAIN_LOGO[row.fromNetwork as ChainTypeValue]}
                    alt={row.fromNetwork}
                    className="size-5"
                  />
              </Tooltip>
              <div>/</div>
              <Tooltip content={row.toNetwork}>
                  <BaseImage 
                    src={CHAIN_LOGO[row.toNetwork as ChainTypeValue]}
                    alt={row.toNetwork}
                    className="size-5"
                  />
              </Tooltip>
          </div>
        )
      }
    },
    {
      name: "Price",
      key: "price",
      selector: "price",
    },
    {
      name: "Status",
      key: "status",
      selector: props.orderOrOffer === OrderOrOffer.OFFER ? "sellerStatus" : "buyerStatus"
    },
    {
      name: "Created at",
      key: "createdAt",
      render: (row: TODO) => {
        return row.createdAt ? moment(row.createdAt).fromNow() : '';
      }
    },
    {
      name: "",
      key: "action",
      render: (row: TODO) => {
        return (
          <Button
            color='gray'
            className="btn-goswapshop-bg-secondary font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            onClick={() => {
                if (props.orderOrOffer === OrderOrOffer.OFFER) {
                    buyerActionHandler(row)
                } else {
                    sellerActionHandler(row)
                }
            }}
          >
            {
               props.orderOrOffer === OrderOrOffer.OFFER ?
                    // @ts-ignore
                    BUYER_ORDER_STATUS_TO_BTN_TEXT[row.buyerStatus] :
                    // @ts-ignore
                    SELLER_ORDER_STATUS_TO_BTN_TEXT[row.sellerStatus]
            }
          </Button>
        )
      },
    }
  ]

    const buyerActionHandler = (row: TODO) => {
        console.log('buyer', row);
    }

    const sellerActionHandler = (row: TODO) => {
        console.log('seller', row);
    }


  return (
    <>
      <h2 className="mb-4 text-2xl text-white">{"My " + props.orderOrOffer}</h2>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            {
              tableMetadata.map((col) => {
                return (
                  <Table.HeadCell key={col.name}>{col.name}</Table.HeadCell>
                )
              })
            }
          </Table.Head>
          <Table.Body className="divide-y">
            {
              Array.isArray(props.data) && props.data.length > 0 ? props.data.map((row, index) => {
                return (
                  <Table.Row key={row.key} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      {
                        tableMetadata.map((col) => {
                          return (
                            <Table.Cell key={col.key} className="whitespace-nowrap px-6 py-4">
                              {col.selector ? row[col.selector] : col.render?.(row)}
                            </Table.Cell>
                          )
                        })
                      }

                  </Table.Row>
                )
              }) : (<></>)
            }
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
