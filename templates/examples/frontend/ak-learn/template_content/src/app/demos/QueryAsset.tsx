import WalletConnectionButton from "@/components/WalletConnectionButton";
import { useWallet } from "@txnlab/use-wallet-react";
import { useState } from "react";
import * as algokit from "@algorandfoundation/algokit-utils";
import { MdSearch, MdCheckCircle, MdInfo } from "react-icons/md";

function AssetInfoCard({ asset }: { asset: any }) {
  if (!asset) return null;
  const params = asset.params || {};
  const rows = [
    ["Asset ID", asset.index ?? "-"],
    ["Name", params.name ?? "-"],
    ["Unit Name", params["unit-name"] ?? "-"],
    ["Creator", params.creator ?? asset.creator ?? "-"],
    ["Total", params.total ?? "-"],
    ["Decimals", params.decimals ?? "-"],
    ["Default Frozen", params.defaultFrozen ? "Yes" : "No"],
    ["Manager", params.manager ?? "-"],
    ["Reserve", params.reserve ?? "-"],
    ["Freeze", params.freeze ?? "-"],
    ["Clawback", params.clawback ?? "-"],
    ["URL", params.url ?? "-"],
    ["Metadata Hash", params.metadataHash ?? "-"],
  ];
  return (
    <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
      <div className="flex items-center justify-center mb-3">
        <MdCheckCircle className="h-6 w-6 text-green-500 mr-2" />
        <h4 className="text-lg font-semibold text-green-800">Asset Found!</h4>
      </div>

      <div className="bg-white border border-green-200 rounded-md p-4 shadow-sm">
        <h4 className="font-bold text-brand-blue-primary mb-4 text-center">
          Asset Information
        </h4>
        <table className="w-full border-separate border-spacing-y-1">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <td className="font-semibold pr-2 text-brand-blue-primary whitespace-nowrap w-1/3">
                  {label}:
                </td>
                <td className="font-mono break-all w-2/3 text-sm">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-xs text-gray-500 text-center">
          Asset data retrieved successfully from the Algorand blockchain.
        </div>
      </div>
    </div>
  );
}

export default function QueryAssetDemo() {
  const { activeWallet, activeAccount } = useWallet();
  const [assetId, setAssetId] = useState("");
  const [assetInfo, setAssetInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async () => {
    setError(null);
    setAssetInfo(null);
    setLoading(true);
    try {
      const algorandClient = algokit.AlgorandClient.testNet();
      const id = Number(assetId);
      if (!Number.isFinite(id) || id <= 0) {
        setError("Please enter a valid asset ID.");
        setLoading(false);
        return;
      }
      const info = await algorandClient.client.algod.getAssetByID(id).do();

      console.log("asset info", info);
      setAssetInfo(info);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch asset info");
    } finally {
      setLoading(false);
    }
  };

  const formDisabled =
    !assetId.trim() || isNaN(Number(assetId)) || Number(assetId) <= 0;

  return (
    <div className="border-2 border-brand-blue-primary bg-brand-blue-secondary rounded-md">
      <div className="bg-brand-blue-primary text-white p-3 border-b-2 border-brand-blue-primary">
        <h3 className="font-bold">Query Algorand Asset</h3>
      </div>

      <div className="p-6">
        {/* Subtle informational message */}
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-700">
            <strong>💡 Tip:</strong> Query asset information from the blockchain
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
                  htmlFor="assetId"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Asset ID
                </label>
                <input
                  id="assetId"
                  type="number"
                  min={1}
                  step={1}
                  value={assetId}
                  onChange={(e) => setAssetId(e.target.value)}
                  placeholder="e.g., 10458941"
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-primary"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleQuery}
                disabled={formDisabled || loading}
                className={`w-full md:w-auto rounded-md px-4 py-2 font-semibold text-white ${
                  formDisabled || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-brand-blue-primary hover:opacity-90"
                }`}
              >
                {loading ? "Querying..." : "Query Asset"}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <div className="text-red-600 text-sm font-medium">
                  <MdInfo className="inline h-4 w-4 mr-1" />
                  Error: {error}
                </div>
              </div>
            )}

            {assetInfo && <AssetInfoCard asset={assetInfo} />}
          </div>
        )}
      </div>
    </div>
  );
}
