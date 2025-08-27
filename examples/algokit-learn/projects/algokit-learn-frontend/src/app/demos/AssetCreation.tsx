import WalletConnectionButton from "@/components/WalletConnectionButton";
import { useWallet } from "@txnlab/use-wallet-react";
import { useState } from "react";
import * as algokit from "@algorandfoundation/algokit-utils";
import { MdToken, MdCheckCircle, MdInfo } from "react-icons/md";

export default function AssetCreationDemo() {
  const { activeWallet, activeAccount, transactionSigner } = useWallet();

  const [assetName, setAssetName] = useState("");
  const [totalUnits, setTotalUnits] = useState<string>("");
  const [createdAssetId, setCreatedAssetId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Replace this with your real asset-creation logic
  const handleAssetCreation = async () => {
    const algorandClient = algokit.AlgorandClient.testNet();

    // Basic guard
    if (!activeWallet || !activeAccount) return;

    const units = Number(totalUnits);
    if (!assetName.trim() || !Number.isFinite(units) || units <= 0) {
      alert(
        "Please provide a valid asset name and a positive total units value."
      );
      return;
    }

    setIsCreating(true);
    try {
      const createdAssetTxnId = await algorandClient.send.assetCreate({
        sender: activeAccount.address,
        signer: transactionSigner,
        total: BigInt(units),
        assetName,
        unitName: assetName.slice(0, 8), // ASA unit name max 8 chars
        decimals: 0, // or set as needed
      });

      await algokit.waitForConfirmation(
        createdAssetTxnId.txIds[0],
        3,
        algorandClient.client.algod
      );

      // Extract asset ID from the transaction result
      const assetId = createdAssetTxnId.confirmation?.assetIndex?.toString();
      setCreatedAssetId(assetId || "Asset created successfully");
    } catch (error) {
      console.error("Asset creation failed:", error);
      alert("Asset creation failed. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const formDisabled =
    !assetName.trim() ||
    !Number.isFinite(Number(totalUnits)) ||
    Number(totalUnits) <= 0;

  return (
    <div className="border-2 border-brand-blue-primary bg-brand-blue-secondary rounded-md">
      <div className="bg-brand-blue-primary text-white p-3 border-b-2 border-brand-blue-primary">
        <h3 className="font-bold">Asset creation</h3>
      </div>

      <div className="p-6">
        {/* Subtle informational message */}
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-700">
            <strong>💡 Tip:</strong> Create tokens and digital assets on Algorand
          </p>
        </div>

        {!activeWallet ? (
          <div className="text-center">
            <WalletConnectionButton />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs text-gray-500 text-center">
              Connected: <span className="font-mono">{activeAccount?.address.slice(0, 8)}...</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <label
                  htmlFor="assetName"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Asset name
                </label>
                <input
                  id="assetName"
                  type="text"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  placeholder="e.g., WeDev Token"
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-primary"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="totalUnits"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Total units
                </label>
                <input
                  id="totalUnits"
                  type="number"
                  min={1}
                  step={1}
                  value={totalUnits}
                  onChange={(e) => setTotalUnits(e.target.value)}
                  placeholder="e.g., 1_000_000"
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-primary"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleAssetCreation}
                disabled={formDisabled || isCreating}
                className={`w-full md:w-auto rounded-md px-4 py-2 font-semibold text-white ${
                  formDisabled || isCreating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-brand-blue-primary hover:opacity-90"
                }`}
              >
                {isCreating ? "Creating Asset..." : "Create asset"}
              </button>
            </div>

            {createdAssetId && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center justify-center mb-2">
                  <MdCheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-700">Asset Created</span>
                </div>
                <div className="text-xs text-gray-600 font-mono bg-white p-2 rounded border text-center">
                  ID: {createdAssetId}
                </div>
                <div className="mt-2 text-center">
                  <a
                    href={`https://lora.algokit.io/testnet/asset/${createdAssetId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    View on Lora Explorer →
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
