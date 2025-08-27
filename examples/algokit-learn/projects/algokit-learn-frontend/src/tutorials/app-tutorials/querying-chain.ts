const useQueryingChain = {
  category: "querying-chain",
  packagesInfo: [
    {
      name: "@algorandfoundation/algokit-utils",
      version: "latest",
      description:
        "Algorand Foundation's utility toolkit for interacting with the Algorand blockchain.",
      purpose:
        "Simplifies Algorand client setup and common blockchain operations.",
      installation: "npm install @algorandfoundation/algokit-utils",
      documentation: "https://github.com/algorandfoundation/algokit-utils-ts",
    },
    {
      name: "algosdk",
      version: "^2.7.0",
      description: "Official Algorand JavaScript SDK.",
      purpose:
        "Low-level access to Algorand blockchain, transactions, and indexer.",
      installation: "npm install algosdk",
      documentation: "https://algorand.github.io/js-algorand-sdk/",
    },
  ],
  tutorialSteps: [
    // Account Info Subtab (granular steps)
    {
      stepName: "Import Algorand Client",
      stepDescription: "Import the Algorand client instance for blockchain queries.",
      codeTab: "algorandClient",
      fileReference: "algorandClient.ts",
      lineRange: { start: 1, end: 4 },
    },
    {
      stepName: "Import Dependencies for Account Query",
      stepDescription: "Import the required dependencies for querying account information.",
      codeTab: "accountInfo",
      fileReference: "accountQuery.ts",
      lineRange: { start: 1, end: 1 },
    },
    {
      stepName: "Define Account Query Function",
      stepDescription: "Create the function signature to query account information.",
      codeTab: "accountInfo",
      fileReference: "accountQuery.ts",
      lineRange: { start: 3, end: 4 },
      editableFields: [
        {
          id: "accountAddress",
          label: "Account Address",
          placeholder: "Enter Algorand address to query...",
          defaultValue: "A3Q4VQFQ5DLEIWCMUX6V7YFZ7BUPWUXWY4YVNJQODUODSQ7KVEFOZUNFUQ",
          targetPattern: "{{ACCOUNT_ADDRESS}}",
          description: "Enter any valid Algorand address to query their balance",
          type: "text" as const,
        },
      ],
    },
    {
      stepName: "Execute Account Query",
      stepDescription: "Call the indexer to fetch account information from the blockchain.",
      codeTab: "accountInfo",
      fileReference: "accountQuery.ts",
      lineRange: { start: 5, end: 10 },
    },
    {
      stepName: "Import React Dependencies",
      stepDescription: "Import React hooks and the account query function for the component.",
      codeTab: "accountInfoComponent",
      fileReference: "AccountQueryForm.tsx",
      lineRange: { start: 1, end: 3 },
    },
    {
      stepName: "Setup Component State",
      stepDescription: "Initialize state for form inputs, loading, and error handling.",
      codeTab: "accountInfoComponent",
      fileReference: "AccountQueryForm.tsx",
      lineRange: { start: 5, end: 11 },
    },
    {
      stepName: "Handle Account Query Execution",
      stepDescription: "Create the function that executes the account query with error handling.",
      codeTab: "accountInfoComponent",
      fileReference: "AccountQueryForm.tsx",
      lineRange: { start: 13, end: 26 },
    },
    {
      stepName: "Render Account Query Form",
      stepDescription: "Build the user interface with input field and query button.",
      codeTab: "accountInfoComponent",
      fileReference: "AccountQueryForm.tsx",
      lineRange: { start: 28, end: 60 },
    },
    // Asset Lookup Subtab (granular steps)
    {
      stepName: "Import Algorand Client",
      stepDescription: "Import the Algorand client instance for blockchain queries.",
      codeTab: "algorandClient",
      fileReference: "algorandClient.ts",
      lineRange: { start: 1, end: 4 },
    },
    {
      stepName: "Import Dependencies for Asset Query",
      stepDescription: "Import the required dependencies for querying asset information.",
      codeTab: "assetLookup",
      fileReference: "assetQuery.ts",
      lineRange: { start: 1, end: 1 },
    },
    {
      stepName: "Define Asset Query Function",
      stepDescription: "Create the function signature to query asset information.",
      codeTab: "assetLookup",
      fileReference: "assetQuery.ts",
      lineRange: { start: 3, end: 4 },
      editableFields: [
        {
          id: "assetId",
          label: "Asset ID",
          placeholder: "Enter Algorand asset ID...",
          defaultValue: "10458941",
          targetPattern: "{{ASSET_ID}}",
          description: "Enter a valid Algorand asset ID to look up its details",
          type: "text" as const,
        },
      ],
    },
    {
      stepName: "Execute Asset Query",
      stepDescription: "Call the algod client to fetch asset information from the blockchain.",
      codeTab: "assetLookup",
      fileReference: "assetQuery.ts",
      lineRange: { start: 5, end: 10 },
    },
    {
      stepName: "Import React Dependencies",
      stepDescription: "Import React hooks and the asset query function for the component.",
      codeTab: "assetLookupComponent",
      fileReference: "AssetQueryForm.tsx",
      lineRange: { start: 1, end: 3 },
    },
    {
      stepName: "Setup Component State",
      stepDescription: "Initialize state for form inputs, loading, and error handling.",
      codeTab: "assetLookupComponent",
      fileReference: "AssetQueryForm.tsx",
      lineRange: { start: 5, end: 11 },
    },
    {
      stepName: "Handle Asset Query Execution",
      stepDescription: "Create the function that executes the asset query with validation and error handling.",
      codeTab: "assetLookupComponent",
      fileReference: "AssetQueryForm.tsx",
      lineRange: { start: 13, end: 30 },
    },
    {
      stepName: "Render Asset Query Form",
      stepDescription: "Build the user interface with input field and query button.",
      codeTab: "assetLookupComponent",
      fileReference: "AssetQueryForm.tsx",
      lineRange: { start: 32, end: 65 },
    },
  ],
  // ...existing code...
  codeTabs: [
    {
      id: "algorandClient",
      label: "algorandClient.ts",
      language: "typescript",
      filename: "algorandClient.ts",
      content: `import * as algokit from '@algorandfoundation/algokit-utils';

// Create and export a configured Algorand client for TestNet
export const algorandClient = algokit.AlgorandClient.testNet();
`,
    },
    {
      id: "accountInfo",
      label: "accountQuery.ts",
      language: "typescript",
      filename: "accountQuery.ts",
      content: `import { algorandClient } from './algorandClient';

// Query an Algorand account's address and balance
export async function getAccountInfo(address: string) {
  const info = await algorandClient.client.indexer.lookupAccountByID(address).do();
  return {
    address: info.account.address,
    balance: info.account.amount
  };
}`,
    },
    {
      id: "accountInfoComponent",
      label: "AccountQueryForm.tsx",
      language: "typescript",
      filename: "AccountQueryForm.tsx",
      content: `import React, { useState } from 'react';
import { useWallet } from '@txnlab/use-wallet-react';
import { getAccountInfo } from './accountQuery';

export default function AccountQueryForm() {
  const { activeAccount } = useWallet();
  const [address, setAddress] = useState('{{ACCOUNT_ADDRESS}}');
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async () => {
    setError(null);
    setAccountInfo(null);
    setLoading(true);
    
    try {
      const info = await getAccountInfo(address);
      setAccountInfo(info);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch account info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-bold mb-4">Query Account Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Account Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded font-mono text-sm"
            placeholder="Enter Algorand address..."
          />
        </div>
        
        <button
          onClick={handleQuery}
          disabled={loading || !address.trim()}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Querying...' : 'Query Account'}
        </button>
        
        {error && (
          <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
            Error: {error}
          </div>
        )}
        
        {accountInfo && (
          <div className="p-2 bg-green-100 rounded text-sm">
            <div><strong>Address:</strong> {accountInfo.address}</div>
            <div><strong>Balance:</strong> {accountInfo.balance} microAlgos</div>
          </div>
        )}
      </div>
    </div>
  );
}
`,
    },
    {
      id: "assetLookup",
      label: "assetQuery.ts",
      language: "typescript",
      filename: "assetQuery.ts",
      content: `import { algorandClient } from './algorandClient';

// Query an Algorand asset's id, name, and total supply
export async function lookupAssetById(assetId: number) {
  const info = await algorandClient.client.algod.getAssetByID(assetId).do();
  return {
    id: info.index,
    name: info.params.name,
    total: info.params.total
  };
}`,
    },
    {
      id: "assetLookupComponent",
      label: "AssetQueryForm.tsx",
      language: "typescript",
      filename: "AssetQueryForm.tsx",
      content: `import React, { useState } from 'react';
import { useWallet } from '@txnlab/use-wallet-react';
import { lookupAssetById } from './assetQuery';

export default function AssetQueryForm() {
  const { activeAccount } = useWallet();
  const [assetId, setAssetId] = useState('{{ASSET_ID}}');
  const [assetInfo, setAssetInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async () => {
    setError(null);
    setAssetInfo(null);
    setLoading(true);
    
    try {
      const id = Number(assetId);
      if (!Number.isFinite(id) || id <= 0) {
        throw new Error('Please enter a valid asset ID');
      }
      const info = await lookupAssetById(id);
      setAssetInfo(info);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch asset info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-bold mb-4">Query Asset Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Asset ID</label>
          <input
            type="number"
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter asset ID..."
          />
        </div>
        
        <button
          onClick={handleQuery}
          disabled={loading || !assetId.trim()}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Querying...' : 'Query Asset'}
        </button>
        
        {error && (
          <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
            Error: {error}
          </div>
        )}
        
        {assetInfo && (
          <div className="p-2 bg-green-100 rounded text-sm">
            <div><strong>ID:</strong> {assetInfo.id}</div>
            <div><strong>Name:</strong> {assetInfo.name}</div>
            <div><strong>Total Supply:</strong> {assetInfo.total}</div>
          </div>
        )}
      </div>
    </div>
  );
}
`,
    },
  ],
};

export default useQueryingChain;
