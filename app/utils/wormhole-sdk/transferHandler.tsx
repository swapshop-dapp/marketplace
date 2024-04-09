"use client";

import {
  CHAIN_ID_KLAYTN,
  CHAIN_ID_POLYGON,
  CHAIN_ID_SOLANA,
  CHAIN_ID_SUI,
  ChainId,
  getEmitterAddressEth,
  getEmitterAddressSolana,
  hexToUint8Array,
  parseSequenceFromLogEth,
  parseSequenceFromLogSolana,
  transferFromEth,
  transferFromEthNative,
  transferFromSolana,
  transferFromSui,
  transferNativeSol,
  uint8ArrayToHex
} from "@certusone/wormhole-sdk";
import { getEmitterAddressAndSequenceFromResponseSui, getOriginalPackageId } from "@certusone/wormhole-sdk/lib/cjs/sui";
import { SuiTransactionBlockResponse } from "@mysten/sui.js/client";
import { WalletContextState } from '@solana/wallet-adapter-react';
import { Connection } from "@solana/web3.js";
import {
  WalletContextState as WalletContextStateSui,
} from "@suiet/wallet-kit";
import { Signer } from "ethers";
import { parseUnits, zeroPad } from "ethers/lib/utils";
import { SOLANA_HOST, SOL_BRIDGE_ADDRESS, SOL_TOKEN_BRIDGE_ADDRESS, getBridgeAddressForChain, getTokenBridgeAddressForChain } from "./consts";
import {
  fetchSignedVAA,
  handleError,
  logTxResult,
  maybeAdditionalPayload,
  sleep
} from "./helper/helpers";
import { signSendAndConfirm } from './helper/solana';
import { getSuiProvider } from "./helper/sui";

export async function evm(
  signer: Signer,
  tokenAddress: string,
  decimals: number,
  amount: string,
  recipientChain: ChainId,
  recipientAddress: Uint8Array,
  isNative: boolean,
  chainId: ChainId,
  relayerFee?: string
) {
  try {
    const baseAmountParsed = parseUnits(amount, decimals);
    const feeParsed = parseUnits(relayerFee || "0", decimals);
    const transferAmountParsed = baseAmountParsed.add(feeParsed);
    const additionalPayload = maybeAdditionalPayload(
      recipientChain,
      recipientAddress,
      chainId
    );
    // Klaytn requires specifying gasPrice
    const overrides =
      chainId === CHAIN_ID_KLAYTN
        ? { gasPrice: (await signer.getGasPrice()).toString() }
        : {};
    const receipt = isNative
      ? await transferFromEthNative(
        getTokenBridgeAddressForChain(chainId),
        signer,
        transferAmountParsed,
        recipientChain,
        additionalPayload?.receivingContract || recipientAddress,
        feeParsed,
        overrides,
        additionalPayload?.payload
      )
      : await transferFromEth(
        getTokenBridgeAddressForChain(chainId),
        signer,
        tokenAddress,
        transferAmountParsed,
        recipientChain,
        additionalPayload?.receivingContract || recipientAddress,
        feeParsed,
        overrides,
        additionalPayload?.payload
      );

    logTxResult(receipt.transactionHash, receipt.blockNumber);

    const sequence = parseSequenceFromLogEth(
      receipt,
      getBridgeAddressForChain(chainId)
    );
    const emitterAddress = getEmitterAddressEth(
      getTokenBridgeAddressForChain(chainId)
    );
    return await fetchSignedVAA(
      chainId,
      emitterAddress,
      sequence
    );
  } catch (e) {
    handleError(e);
  }
}

export async function solana(
  wallet: WalletContextState,
  payerAddress: string, //TODO: we may not need this since we have wallet
  fromAddress: string,
  mintAddress: string,
  amount: string,
  decimals: number = 9,
  targetChain: ChainId = CHAIN_ID_POLYGON,
  targetAddress: Uint8Array = hexToUint8Array('000000000000000000000000522c534b011209e1b8e6e385204854db0ccda309'),
  isNative: boolean = true,
  originAddressStr: string = '069b8857feab8184fb687f634618c035dac439dc1aeb3b5598a0f00000000001',
  originChain: ChainId = 1,
  relayerFee?: string
) {
  mintAddress = 'So11111111111111111111111111111111111111112';
  targetChain = CHAIN_ID_POLYGON;
  decimals = 9;
  targetAddress = hexToUint8Array('000000000000000000000000522c534b011209e1b8e6e385204854db0ccda309');
  originAddressStr = '069b8857feab8184fb687f634618c035dac439dc1aeb3b5598a0f00000000001';
  originChain = CHAIN_ID_SOLANA;
  console.log('payerAddress', payerAddress);
  console.log('fromAddress', fromAddress);
  console.log('mintAddress', mintAddress);
  console.log('amount', amount);
  console.log('decimals', decimals);
  console.log('targetChain', targetChain);
  console.log('targetAddress', uint8ArrayToHex(targetAddress).toString());
  console.log('isNative', isNative);
  console.log('originAddressStr', originAddressStr);
  console.log('originChain', originChain);
  console.log('relayerFee', relayerFee);
  console.log('IsSending', true);
  try {
    const connection = new Connection(SOLANA_HOST, "confirmed");
    const baseAmountParsed = parseUnits(amount, decimals);
    const feeParsed = parseUnits(relayerFee || "0", decimals);
    const transferAmountParsed = baseAmountParsed.add(feeParsed);
    const additionalPayload = maybeAdditionalPayload(
      targetChain,
      targetAddress,
      originChain
    );
    const originAddress = originAddressStr
      ? zeroPad(hexToUint8Array(originAddressStr), 32)
      : undefined;
    const promise = isNative
      ? transferNativeSol(
        connection,
        SOL_BRIDGE_ADDRESS,
        SOL_TOKEN_BRIDGE_ADDRESS,
        payerAddress,
        transferAmountParsed.toBigInt(),
        additionalPayload?.receivingContract || targetAddress,
        targetChain,
        feeParsed.toBigInt(),
        additionalPayload?.payload
      )
      : transferFromSolana(
        connection,
        SOL_BRIDGE_ADDRESS,
        SOL_TOKEN_BRIDGE_ADDRESS,
        payerAddress,
        fromAddress,
        mintAddress,
        transferAmountParsed.toBigInt(),
        additionalPayload?.receivingContract || targetAddress,
        targetChain,
        originAddress,
        originChain,
        undefined,
        feeParsed.toBigInt(),
        additionalPayload?.payload
      );
    const transaction = await promise;
    const txid = await signSendAndConfirm(wallet, connection, transaction);
    const info = await connection.getTransaction(txid);
    if (!info) {
      throw new Error("An error occurred while fetching the transaction info");
    }

    logTxResult(txid, info.slot);

    const sequence = parseSequenceFromLogSolana(info);
    const emitterAddress = await getEmitterAddressSolana(
      SOL_TOKEN_BRIDGE_ADDRESS
    );
    console.log('sequence', sequence);
    console.log('emitterAddress', emitterAddress);
    await sleep(15000)
    await fetchSignedVAA(
      CHAIN_ID_SOLANA,
      emitterAddress,
      sequence,
    );
  } catch (e) {
    handleError(e);
  }
}

/**
 async function algo(
 dispatch: any,
 enqueueSnackbar: any,
 senderAddr: string,
 tokenAddress: string,
 decimals: number,
 amount: string,
 recipientChain: ChainId,
 recipientAddress: Uint8Array,
 chainId: ChainId,
 originChain?: ChainId,
 relayerFee?: string
 ) {
 dispatch(setIsSending(true));
 try {
 const baseAmountParsed = parseUnits(amount, decimals);
 const feeParsed = parseUnits(relayerFee || "0", decimals);
 const transferAmountParsed = baseAmountParsed.add(feeParsed);
 const additionalPayload = maybeAdditionalPayload(
 recipientChain,
 recipientAddress,
 originChain
 );
 const algodClient = new algosdk.Algodv2(
 ALGORAND_HOST.algodToken,
 ALGORAND_HOST.algodServer,
 ALGORAND_HOST.algodPort
 );
 const txs = await transferFromAlgorand(
 algodClient,
 ALGORAND_TOKEN_BRIDGE_ID,
 ALGORAND_BRIDGE_ID,
 senderAddr,
 BigInt(tokenAddress),
 transferAmountParsed.toBigInt(),
 uint8ArrayToHex(additionalPayload?.receivingContract || recipientAddress),
 recipientChain,
 feeParsed.toBigInt(),
 additionalPayload?.payload
 );
 const result = await signSendAndConfirmAlgorand(algodClient, txs);
 const sequence = parseSequenceFromLogAlgorand(result);
 dispatch(
 setTransferTx({
 id: txs[txs.length - 1].tx.txID(),
 block: result["confirmed-round"],
 })
 );
 enqueueSnackbar(null, {
 content: <Alert severity="success">Transaction confirmed</Alert>,
 });
 const emitterAddress = getEmitterAddressAlgorand(ALGORAND_TOKEN_BRIDGE_ID);
 await fetchSignedVAA(
 chainId,
 emitterAddress,
 sequence,
 enqueueSnackbar,
 dispatch
 );
 } catch (e) {
 handleError(e, enqueueSnackbar, dispatch);
 }
 }

 async function aptos(
 dispatch: any,
 enqueueSnackbar: any,
 tokenAddress: string,
 decimals: number,
 amount: string,
 recipientChain: ChainId,
 recipientAddress: Uint8Array,
 chainId: ChainId,
 signAndSubmitTransaction: (
 transaction: Types.TransactionPayload,
 options?: any
 ) => Promise<{
 hash: string;
 }>,
 originChain?: ChainId,
 relayerFee?: string
 ) {
 dispatch(setIsSending(true));
 const tokenBridgeAddress = getTokenBridgeAddressForChain(CHAIN_ID_APTOS);
 try {
 const baseAmountParsed = parseUnits(amount, decimals);
 const feeParsed = parseUnits(relayerFee || "0", decimals);
 const transferAmountParsed = baseAmountParsed.add(feeParsed);
 const additionalPayload = maybeAdditionalPayload(
 recipientChain,
 recipientAddress,
 originChain
 );
 if (additionalPayload?.payload) {
 throw new Error("Transfer with payload is unsupported on Aptos");
 }
 const transferPayload = transferTokens(
 tokenBridgeAddress,
 tokenAddress,
 transferAmountParsed.toString(),
 recipientChain,
 recipientAddress,
 feeParsed.toString(),
 createNonce().readUInt32LE(0)
 );
 const hash = await waitForSignAndSubmitTransaction(
 transferPayload,
 signAndSubmitTransaction
 );
 dispatch(setTransferTx({ id: hash, block: 1 }));
 enqueueSnackbar(null, {
 content: <Alert severity="success">Transaction confirmed</Alert>,
 });
 const result = (await getAptosClient().waitForTransactionWithResult(
 hash
 )) as Types.UserTransaction;
 const { emitterAddress, sequence } =
 getEmitterAddressAndSequenceFromResult(result);
 await fetchSignedVAA(
 chainId,
 emitterAddress,
 sequence,
 enqueueSnackbar,
 dispatch
 );
 } catch (e) {
 enqueueSnackbar(null, {
 content: <Alert severity="error">{parseError(e)}</Alert>,
 });
 dispatch(setIsSending(false));
 }
 }

 async function near(
 dispatch: any,
 enqueueSnackbar: any,
 wallet: Wallet,
 senderAddr: string,
 tokenAddress: string,
 decimals: number,
 amount: string,
 recipientChain: ChainId,
 recipientAddress: Uint8Array,
 chainId: ChainId,
 originChain?: ChainId,
 relayerFee?: string
 ) {
 dispatch(setIsSending(true));
 try {
 const baseAmountParsed = parseUnits(amount, decimals);
 const feeParsed = parseUnits(relayerFee || "0", decimals);
 const transferAmountParsed = baseAmountParsed.add(feeParsed);
 const additionalPayload = maybeAdditionalPayload(
 recipientChain,
 recipientAddress,
 originChain
 );
 const account = await makeNearAccount(senderAddr);
 const msgs =
 tokenAddress === NATIVE_NEAR_PLACEHOLDER
 ? [
 await transferNearFromNear(
 makeNearProvider(),
 NEAR_CORE_BRIDGE_ACCOUNT,
 NEAR_TOKEN_BRIDGE_ACCOUNT,
 transferAmountParsed.toBigInt(),
 additionalPayload?.receivingContract || recipientAddress,
 recipientChain,
 feeParsed.toBigInt(),
 additionalPayload?.payload
 ? uint8ArrayToHex(additionalPayload.payload)
 : undefined
 ),
 ]
 : await transferTokenFromNear(
 makeNearProvider(),
 account.accountId,
 NEAR_CORE_BRIDGE_ACCOUNT,
 NEAR_TOKEN_BRIDGE_ACCOUNT,
 tokenAddress,
 transferAmountParsed.toBigInt(),
 additionalPayload?.receivingContract || recipientAddress,
 recipientChain,
 feeParsed.toBigInt(),
 additionalPayload?.payload
 ? uint8ArrayToHex(additionalPayload.payload)
 : undefined
 );
 const receipt = await signAndSendTransactions(account, wallet, msgs);
 const sequence = parseSequenceFromLogNear(receipt);
 dispatch(
 setTransferTx({
 id: receipt.transaction_outcome.id,
 block: 0,
 })
 );
 if (sequence === null) {
 throw new Error("Unable to parse sequence from log");
 }
 enqueueSnackbar(null, {
 content: <Alert severity="success">Transaction confirmed</Alert>,
 });
 const emitterAddress = getEmitterAddressNear(NEAR_TOKEN_BRIDGE_ACCOUNT);
 await fetchSignedVAA(
 chainId,
 emitterAddress,
 sequence,
 enqueueSnackbar,
 dispatch
 );
 } catch (e) {
 handleError(e, enqueueSnackbar, dispatch);
 }
 }

 async function terra(
 dispatch: any,
 enqueueSnackbar: any,
 wallet: ConnectedWallet,
 asset: string,
 amount: string,
 decimals: number,
 targetChain: ChainId,
 targetAddress: Uint8Array,
 feeDenom: string,
 chainId: TerraChainId,
 originChain?: ChainId,
 relayerFee?: string
 ) {
 dispatch(setIsSending(true));
 try {
 const baseAmountParsed = parseUnits(amount, decimals);
 const feeParsed = parseUnits(relayerFee || "0", decimals);
 const transferAmountParsed = baseAmountParsed.add(feeParsed);
 const tokenBridgeAddress = getTokenBridgeAddressForChain(chainId);
 const additionalPayload = maybeAdditionalPayload(
 targetChain,
 targetAddress,
 originChain
 );
 const msgs = await transferFromTerra(
 wallet.terraAddress,
 tokenBridgeAddress,
 asset,
 transferAmountParsed.toString(),
 targetChain,
 additionalPayload?.receivingContract || targetAddress,
 feeParsed.toString(),
 additionalPayload?.payload
 );

 const result = await postWithFees(
 wallet,
 msgs,
 "Wormhole - Initiate Transfer",
 [feeDenom],
 chainId
 );

 const info = await waitForTerraExecution(result, chainId);
 dispatch(setTransferTx({ id: info.txhash, block: info.height }));
 enqueueSnackbar(null, {
 content: <Alert severity="success">Transaction confirmed</Alert>,
 });
 const sequence = parseSequenceFromLogTerra(info);
 if (!sequence) {
 throw new Error("Sequence not found");
 }
 const emitterAddress = await getEmitterAddressTerra(tokenBridgeAddress);
 await fetchSignedVAA(
 chainId,
 emitterAddress,
 sequence,
 enqueueSnackbar,
 dispatch
 );
 } catch (e) {
 handleError(e, enqueueSnackbar, dispatch);
 }
 }

 async function xpla(
 dispatch: any,
 enqueueSnackbar: any,
 wallet: XplaConnectedWallet,
 asset: string,
 amount: string,
 decimals: number,
 targetChain: ChainId,
 targetAddress: Uint8Array,
 originChain?: ChainId,
 relayerFee?: string
 ) {
 dispatch(setIsSending(true));
 try {
 const baseAmountParsed = parseUnits(amount, decimals);
 const feeParsed = parseUnits(relayerFee || "0", decimals);
 const transferAmountParsed = baseAmountParsed.add(feeParsed);
 const tokenBridgeAddress = getTokenBridgeAddressForChain(CHAIN_ID_XPLA);
 const additionalPayload = maybeAdditionalPayload(
 targetChain,
 targetAddress,
 originChain
 );
 const msgs = await transferFromXpla(
 wallet.xplaAddress,
 tokenBridgeAddress,
 asset,
 transferAmountParsed.toString(),
 targetChain,
 additionalPayload?.receivingContract || targetAddress,
 feeParsed.toString(),
 additionalPayload?.payload
 );

 const result = await postWithFeesXpla(
 wallet,
 msgs,
 "Wormhole - Initiate Transfer"
 );

 const info = await waitForXplaExecution(result);
 dispatch(setTransferTx({ id: info.txhash, block: info.height }));
 enqueueSnackbar(null, {
 content: <Alert severity="success">Transaction confirmed</Alert>,
 });
 const sequence = parseSequenceFromLogXpla(info);
 if (!sequence) {
 throw new Error("Sequence not found");
 }
 const emitterAddress = await getEmitterAddressXpla(tokenBridgeAddress);
 await fetchSignedVAA(
 CHAIN_ID_XPLA,
 emitterAddress,
 sequence,
 enqueueSnackbar,
 dispatch
 );
 } catch (e) {
 handleError(e, enqueueSnackbar, dispatch);
 }
 }

 async function injective(
 dispatch: any,
 enqueueSnackbar: any,
 wallet: WalletStrategy,
 walletAddress: string,
 asset: string,
 amount: string,
 decimals: number,
 targetChain: ChainId,
 targetAddress: Uint8Array,
 originChain?: ChainId,
 relayerFee?: string
 ) {
 dispatch(setIsSending(true));
 try {
 const baseAmountParsed = parseUnits(amount, decimals);
 const feeParsed = parseUnits(relayerFee || "0", decimals);
 const transferAmountParsed = baseAmountParsed.add(feeParsed);
 const tokenBridgeAddress =
 getTokenBridgeAddressForChain(CHAIN_ID_INJECTIVE);
 const additionalPayload = maybeAdditionalPayload(
 targetChain,
 targetAddress,
 originChain
 );
 const msgs = await transferFromInjective(
 walletAddress,
 tokenBridgeAddress,
 asset,
 transferAmountParsed.toString(),
 targetChain,
 additionalPayload?.receivingContract || targetAddress,
 feeParsed.toString(),
 additionalPayload?.payload
 );
 const tx = await broadcastInjectiveTx(
 wallet,
 walletAddress,
 msgs,
 "Wormhole - Initiate Transfer"
 );
 dispatch(setTransferTx({ id: tx.txHash, block: tx.height }));
 enqueueSnackbar(null, {
 content: <Alert severity="success">Transaction confirmed</Alert>,
 });
 const sequence = parseSequenceFromLogInjective(tx);
 if (!sequence) {
 throw new Error("Sequence not found");
 }
 const emitterAddress = await getEmitterAddressInjective(tokenBridgeAddress);
 await fetchSignedVAA(
 CHAIN_ID_INJECTIVE,
 emitterAddress,
 sequence,
 enqueueSnackbar,
 dispatch
 );
 } catch (e) {
 handleError(e, enqueueSnackbar, dispatch);
 }
 }

 async function sei(
 dispatch: any,
 enqueueSnackbar: any,
 wallet: SigningCosmWasmClient,
 walletAddress: string,
 asset: string,
 amount: string,
 decimals: number,
 targetChain: ChainId,
 targetAddress: Uint8Array,
 relayerFee?: string
 ) {
 dispatch(setIsSending(true));
 try {
 const baseAmountParsed = parseUnits(amount, decimals);
 const feeParsed = parseUnits(relayerFee || "0", decimals);
 const transferAmountParsed = baseAmountParsed.add(feeParsed);
 const tokenBridgeAddress = getTokenBridgeAddressForChain(CHAIN_ID_SEI);
 let sequence: string = "";
 if (asset.startsWith(`factory/${SEI_TRANSLATOR}/`)) {
 const msg = {
 convert_and_transfer: {
 recipient_chain: targetChain,
 recipient: Buffer.from(targetAddress).toString("base64"),
 fee: feeParsed.toString(),
 },
 };
 const fee = calculateFee(750000, "0.1usei");
 const tx = await wallet.execute(
 walletAddress,
 SEI_TRANSLATOR,
 msg,
 fee,
 "Wormhole - Initiate Transfer",
 [{ denom: asset, amount: transferAmountParsed.toString() }]
 );
 dispatch(setTransferTx({ id: tx.transactionHash, block: tx.height }));
 enqueueSnackbar(null, {
 content: <Alert severity="success">Transaction confirmed</Alert>,
 });
 sequence = parseSequenceFromLogSei(tx);
 } else if (isNativeDenomSei(asset)) {
 const fee = calculateFee(600000, "0.1usei");
 const nonce = Math.round(Math.random() * 100000);
 const tx = await wallet.executeMultiple(
 walletAddress,
 [
 {
 contractAddress: tokenBridgeAddress,
 msg: {
 deposit_tokens: {},
 },
 funds: [{ denom: asset, amount: transferAmountParsed.toString() }],
 },
 {
 contractAddress: tokenBridgeAddress,
 msg: {
 initiate_transfer: {
 asset: {
 amount: transferAmountParsed.toString(),
 info: {
 native_token: {
 denom: asset,
 },
 },
 },
 recipient_chain: targetChain,
 recipient: Buffer.from(targetAddress).toString("base64"),
 fee: feeParsed.toString(),
 nonce,
 },
 },
 },
 ],
 fee,
 "Wormhole - Initiate Transfer"
 );
 dispatch(setTransferTx({ id: tx.transactionHash, block: tx.height }));
 enqueueSnackbar(null, {
 content: <Alert severity="success">Transaction confirmed</Alert>,
 });
 sequence = parseSequenceFromLogSei(tx);
 } else {
 throw new Error("Unsupported asset");
 }
 if (!sequence) {
 throw new Error("Sequence not found");
 }
 const emitterAddress = await getEmitterAddressTerra(tokenBridgeAddress);
 console.log("Sei VAA", CHAIN_ID_SEI, emitterAddress, sequence);
 await fetchSignedVAA(
 CHAIN_ID_SEI,
 emitterAddress,
 sequence,
 enqueueSnackbar,
 dispatch
 );
 } catch (e) {
 handleError(e, enqueueSnackbar, dispatch);
 }
 }

 */
export async function sui(
  wallet: WalletContextStateSui,
  asset: string,
  amount: string,
  decimals: number,
  targetChain: ChainId,
  targetAddress: Uint8Array,
  relayerFee?: string
) {
  console.log('isSending', true);
  try {
    if (!wallet.address) {
      throw new Error("No wallet address");
    }
    const baseAmountParsed = parseUnits(amount, decimals);
    const feeParsed = parseUnits(relayerFee || "0", decimals);
    const transferAmountParsed = baseAmountParsed.add(feeParsed);
    const provider = getSuiProvider();
    // TODO: handle pagination
    const coins = (
      await provider.getCoins({
        owner: wallet.address,
        coinType: asset,
      })
    ).data;
    const tx = await transferFromSui(
      provider,
      getBridgeAddressForChain(CHAIN_ID_SUI),
      getTokenBridgeAddressForChain(CHAIN_ID_SUI),
      coins,
      asset,
      transferAmountParsed.toBigInt(),
      targetChain,
      targetAddress
    );
    const response = await wallet.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      options: {
        showEvents: true,
      },
    }) as SuiTransactionBlockResponse;
    logTxResult(response.digest, Number(response.checkpoint || 0))

    const coreBridgePackageId = await getOriginalPackageId(
      provider,
      getBridgeAddressForChain(CHAIN_ID_SUI)
    );
    if (!coreBridgePackageId)
      throw new Error("Unable to retrieve original package id");
    const { sequence, emitterAddress } =
      getEmitterAddressAndSequenceFromResponseSui(
        coreBridgePackageId,
        response
      );
    
    return await fetchSignedVAA(
      CHAIN_ID_SUI,
      emitterAddress,
      sequence
    );
  } catch (e) {
    handleError(e);
  }
}
