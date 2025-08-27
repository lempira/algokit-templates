// Asset creation tutorial for native assets
const useAssetCreation = {
  native_asset: {
    tutorialSteps: [
      {
        stepName: "Import Algorand Client",
        stepDescription:
          "Import and configure the Algorand client using algokit.",
        codeTab: "algorandClient",
        fileReference: "algorandClient.ts",
        lineRange: { start: 1, end: 4 },
      },
      {
        stepName: "Import Dependencies",
        stepDescription: "Import the required dependencies for asset creation.",
        codeTab: "assetCreation",
        fileReference: "assetCreation.ts",
        lineRange: { start: 1, end: 2 },
      },

      {
        stepName: "Call Asset Create API",
        stepDescription:
          "Use algokit's simplified API to create the asset with specified parameters.",
        codeTab: "assetCreation",
        fileReference: "assetCreation.ts",
        lineRange: { start: 4, end: 26 },
        editableFields: [
          {
            id: "unitName",
            label: "Unit Name",
            placeholder: "MYCOIN",
            defaultValue: "MYCOIN",
            targetPattern: "MYCOIN",
            description: "The short name for your asset (e.g. USDC, BTC)",
            type: "text" as const,
          },
          {
            id: "assetName",
            label: "Asset Name",
            placeholder: "My Example Coin",
            defaultValue: "My Example Coin",
            targetPattern: "My Example Coin",
            description: "The full name of your asset",
            type: "text" as const,
          },
        ],
      },
      {
        stepName: "Wait for Transaction Confirmation",
        stepDescription:
          "Wait for the transaction to be confirmed on the blockchain.",
        codeTab: "assetCreation",
        fileReference: "assetCreation.ts",
        lineRange: { start: 28, end: 37 },
      },
      {
        stepName: "Return Asset ID",
        stepDescription:
          "Extract and return the newly created asset ID from the transaction confirmation.",
        codeTab: "assetCreation",
        fileReference: "assetCreation.ts",
        lineRange: { start: 36, end: 36 },
      },
      {
        stepName: "Import React Dependencies",
        stepDescription:
          "Import React, wallet hooks, and the asset creation function.",
        codeTab: "assetCreationComponent",
        fileReference: "AssetCreationForm.tsx",
        lineRange: { start: 1, end: 3 },
      },
      {
        stepName: "Setup Component State",
        stepDescription:
          "Initialize component state for form inputs and wallet integration.",
        codeTab: "assetCreationComponent",
        fileReference: "AssetCreationForm.tsx",
        lineRange: { start: 6, end: 11 },
      },
      {
        stepName: "Handle Asset Creation",
        stepDescription:
          "Create the function that executes asset creation with form data.",
        codeTab: "assetCreationComponent",
        fileReference: "AssetCreationForm.tsx",
        lineRange: { start: 13, end: 35 },
      },
      {
        stepName: "Render Form UI",
        stepDescription:
          "Build the user interface with input fields and submission button.",
        codeTab: "assetCreationComponent",
        fileReference: "AssetCreationForm.tsx",
        lineRange: { start: 37, end: 88 },
      },
    ],
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
        id: "assetCreation",
        label: "assetCreation.ts",
        language: "typescript",
        filename: "assetCreation.ts",
        content: `import { algorandClient } from './algorandClient';
import * as algokit from '@algorandfoundation/algokit-utils';

// Asset creation function that receives parameters
export async function createAsset(
  senderAddress: string,
  transactionSigner: any,
  assetName: string,
  unitName: string,
  totalUnits: number
) {
  // Create the asset using algokit's simplified API
  const createdAssetTxnId = await algorandClient.send.assetCreate({
    sender: senderAddress,
    signer: transactionSigner,
    total: BigInt(totalUnits),
    assetName: 'My Example Coin', // This will be replaced by editable field
    unitName: 'MYCOIN', // This will be replaced by editable field
    decimals: 0, // No decimal places for this example
    defaultFrozen: false, // Asset starts unfrozen
    manager: senderAddress, // Creator becomes manager
    reserve: senderAddress,
    freeze: undefined, // No freeze address
    clawback: undefined, // No clawback address
    url: 'https://example.com',
  });

  // Wait for transaction confirmation
  await algokit.waitForConfirmation(
    createdAssetTxnId.txIds[0],
    3,
    algorandClient.client.algod
  );

  // Return the asset ID from the confirmed transaction
  return createdAssetTxnId.confirmation?.assetIndex;
}
`,
      },
      {
        id: "assetCreationComponent",
        label: "AssetCreationForm.tsx",
        language: "typescript",
        filename: "AssetCreationForm.tsx",
        content: `import React, { useState } from 'react';
import { useWallet } from '@txnlab/use-wallet-react';
import { createAsset } from './assetCreation';

export default function AssetCreationForm() {
  const { activeAccount, transactionSigner } = useWallet();
  const [assetName, setAssetName] = useState('My Example Coin');
  const [unitName, setUnitName] = useState('MYCOIN');
  const [totalUnits, setTotalUnits] = useState(1000000);
  const [isCreating, setIsCreating] = useState(false);
  const [createdAssetId, setCreatedAssetId] = useState<number | null>(null);

  const handleCreateAsset = async () => {
    if (!activeAccount || !transactionSigner) {
      alert('Please connect your wallet first');
      return;
    }

    setIsCreating(true);
    try {
      const assetId = await createAsset(
        activeAccount.address,
        transactionSigner,
        assetName,
        unitName,
        totalUnits
      );
      setCreatedAssetId(assetId);
    } catch (error) {
      console.error('Asset creation failed:', error);
      alert('Asset creation failed. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-bold mb-4">Create Algorand Asset</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Asset Name</label>
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Unit Name</label>
          <input
            type="text"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            className="w-full p-2 border rounded"
            maxLength={8}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Total Units</label>
          <input
            type="number"
            value={totalUnits}
            onChange={(e) => setTotalUnits(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          onClick={handleCreateAsset}
          disabled={isCreating || !activeAccount}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {isCreating ? 'Creating Asset...' : 'Create Asset'}
        </button>
        
        {createdAssetId && (
          <div className="p-2 bg-green-100 rounded">
            Asset created successfully! ID: {createdAssetId}
          </div>
        )}
      </div>
    </div>
  );
}
`,
      },
    ],
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
  },
};

export default useAssetCreation;
