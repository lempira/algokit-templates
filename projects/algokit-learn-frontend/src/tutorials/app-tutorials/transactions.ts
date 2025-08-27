const useTransactions = {
  category: "transactions",
  tutorialSteps: [
    {
      stepName: "Import Algorand SDK",
      stepDescription: `Import the necessary modules from algosdk to work with transactions. We need algosdk for creating and managing transactions, and the transaction types for proper TypeScript support.`,
      codeTab: "main",
      fileReference: "transactions.ts",
      lineRange: { start: 1, end: 2 },
    },
    {
      stepName: "Configure Algod client",
      stepDescription: `Create an Algod client instance to communicate with the Algorand network. This client will be used to submit transactions and query network information.`,
      codeTab: "main",
      fileReference: "transactions.ts",
      lineRange: { start: 4, end: 8 },
    },
    {
      stepName: "Create payment transaction",
      stepDescription: `Build a payment transaction using makePaymentTxnWithSuggestedParamsFromObject. This function creates a transaction object with all the necessary parameters.`,
      codeTab: "main",
      fileReference: "transactions.ts",
      lineRange: { start: 10, end: 20 },
    },
    {
      stepName: "Sign and submit transaction",
      stepDescription: `Sign the transaction with the sender's private key and submit it to the network using the Algod client. Handle the response to get the transaction ID.`,
      codeTab: "main",
      fileReference: "transactions.ts",
      lineRange: { start: 22, end: 36 },
    },
  ],
  packagesInfo: [
    {
      name: "algosdk",
      version: "2.7.0",
      description:
        "The official Algorand JavaScript SDK for building applications on the Algorand blockchain.",
      purpose:
        "Provides all the tools needed to create transactions, interact with smart contracts, and communicate with the Algorand network.",
      installation: "npm install algosdk",
      documentation: "https://algorand.github.io/js-algorand-sdk/",
    },
    {
      name: "@txnlab/use-wallet-react",
      version: "3.0.0",
      description:
        "Used here for its transaction signing capabilities and wallet integration.",
      purpose:
        "Provides the signTransactions function that handles transaction signing through connected wallets.",
      installation: "npm install @txnlab/use-wallet-react",
      documentation: "https://github.com/TxnLab/use-wallet",
    },
    {
      name: "Algonode",
      version: "API Service",
      description:
        "Free Algorand API service providing Algod and Indexer endpoints.",
      purpose:
        "Reliable infrastructure for connecting to Algorand MainNet and TestNet without running your own node.",
      installation: "No installation required - public API",
      documentation: "https://algonode.io/",
    },
  ],
  codeExample: `import algosdk from 'algosdk';
import { WalletTransaction } from '@txnlab/use-wallet-react';

// Configure Algod client for TestNet
const algodClient = new algosdk.Algodv2(
  '', // token
  'https://testnet-api.algonode.cloud', // server
  443 // port
);

async function sendPayment(
  sender: string,
  receiver: string, 
  amount: number,
  signTransactions: (txns: WalletTransaction[]) => Promise<Uint8Array[]>
) {
  try {
    // Get suggested transaction parameters
    const suggestedParams = await algodClient.getTransactionParams().do();
    
    // Create payment transaction
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender,
      to: receiver,
      amount: amount * 1000000, // Convert to microAlgos
      suggestedParams: suggestedParams,
    });

    // Sign and submit transaction
    const signedTxns = await signTransactions([{ txn: paymentTxn }]);
    const { txId } = await algodClient.sendRawTransaction(signedTxns[0]).do();
    
    console.log('Transaction submitted:', txId);
    return txId;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}`,
};

export default useTransactions;
