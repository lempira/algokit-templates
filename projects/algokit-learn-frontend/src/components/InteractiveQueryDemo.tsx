import { useState } from "react";

interface Asset {
  "asset-id": number;
  amount: number;
  "is-frozen": boolean;
}

interface MockAccountData {
  amount: number;
  assets: Asset[];
  "created-apps": number[];
  "created-assets": number[];
}

interface InteractiveQueryDemoProps {
  title: string;
  description: string;
}

// Mock data for demo purposes - simulating real TestNet accounts
const mockAccounts: Record<string, MockAccountData> = {
  // Realistic TestNet addresses for demo
  TESTACCOUNT1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX: {
    amount: 15750000, // 15.75 ALGO
    assets: [
      { "asset-id": 123456, amount: 1, "is-frozen": false },
      { "asset-id": 789012, amount: 500000, "is-frozen": false },
      { "asset-id": 345678, amount: 1, "is-frozen": false },
    ],
    "created-apps": [],
    "created-assets": [],
  },
  DEVWALLET2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX: {
    amount: 42350000, // 42.35 ALGO
    assets: [
      { "asset-id": 111222, amount: 1, "is-frozen": false },
      { "asset-id": 333444, amount: 10000000, "is-frozen": false },
      { "asset-id": 555666, amount: 25, "is-frozen": false },
    ],
    "created-apps": [12345, 67890],
    "created-assets": [111222],
  },
  ALGORANDDEVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX: {
    amount: 8500000, // 8.5 ALGO
    assets: [
      { "asset-id": 777888, amount: 1, "is-frozen": false },
      { "asset-id": 999000, amount: 2500000, "is-frozen": false },
    ],
    "created-apps": [],
    "created-assets": [777888, 999000],
  },
};

const mockAssetInfo: Record<number, any> = {
  123456: {
    name: "Algorand NFT Collection #1",
    "unit-name": "ANFT",
    decimals: 0,
    total: 1,
  },
  789012: {
    name: "TestNet Reward Token",
    "unit-name": "REWARD",
    decimals: 6,
    total: 1000000,
  },
  345678: {
    name: "Digital Art Piece",
    "unit-name": "ART",
    decimals: 0,
    total: 1,
  },
  111222: {
    name: "Creator Badge NFT",
    "unit-name": "BADGE",
    decimals: 0,
    total: 1,
  },
  333444: {
    name: "Community Token",
    "unit-name": "COMM",
    decimals: 6,
    total: 100000000,
  },
  555666: {
    name: "Limited Edition Pass",
    "unit-name": "PASS",
    decimals: 0,
    total: 100,
  },
  777888: {
    name: "Developer Achievement",
    "unit-name": "DEV",
    decimals: 0,
    total: 1,
  },
  999000: {
    name: "Utility Governance Token",
    "unit-name": "UGT",
    decimals: 6,
    total: 10000000,
  },
};

export default function InteractiveQueryDemo({
  title,
  description,
}: InteractiveQueryDemoProps) {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [queryResult, setQueryResult] = useState<string>("");
  const [hasQueried, setHasQueried] = useState(false);

  const handleQuery = async () => {
    if (!address.trim()) {
      setQueryResult("❌ Please enter an address to query");
      return;
    }

    setIsLoading(true);
    setHasQueried(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if we have mock data for this address
    const accountData = mockAccounts[address.trim()];

    if (!accountData) {
      // For unknown addresses, show a realistic "not found" or "empty account" response
      setQueryResult(`🔍 Querying address: ${address.substring(0, 20)}...

📡 Connected to Algorand TestNet Indexer
⏳ Fetching account information...

📊 Query Results:
💰 Account Balance: 0.000000 ALGO
🎨 Assets Owned: 0 assets
📱 Created Apps: 0
🏭 Created Assets: 0

ℹ️  This account appears to be empty or doesn't exist on TestNet.
   Try one of these example addresses with assets:
   • TESTACCOUNT1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   • DEVWALLET2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   • ALGORANDDEVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`);
    } else {
      // Show detailed mock data
      const algoBalance = (accountData.amount / 1000000).toFixed(6);
      let assetDetails = "";

      if (accountData.assets.length > 0) {
        assetDetails = "\n🎨 Asset Details:\n";
        accountData.assets.forEach((asset) => {
          const assetInfo = mockAssetInfo[asset["asset-id"]];
          if (assetInfo) {
            const displayAmount =
              assetInfo.decimals > 0
                ? (asset.amount / Math.pow(10, assetInfo.decimals)).toFixed(
                    assetInfo.decimals
                  )
                : asset.amount.toString();
            assetDetails += `   • ${assetInfo.name} (${assetInfo["unit-name"]}): ${displayAmount} units\n`;
            assetDetails += `     Asset ID: ${asset["asset-id"]} | Frozen: ${
              asset["is-frozen"] ? "Yes" : "No"
            }\n`;
          }
        });
      }

      setQueryResult(`🔍 Querying address: ${address.substring(0, 20)}...

📡 Connected to Algorand TestNet Indexer
⏳ Fetching account information...
✅ Account found successfully!

📊 Query Results:
💰 Account Balance: ${algoBalance} ALGO
🎨 Assets Owned: ${accountData.assets.length} assets
📱 Created Apps: ${accountData["created-apps"].length}
🏭 Created Assets: ${accountData["created-assets"].length}${assetDetails}

✨ Query completed in 1.2s`);
    }

    setIsLoading(false);
  };

  const handleClear = () => {
    setAddress("");
    setQueryResult("");
    setHasQueried(false);
  };

  const fillExampleAddress = (exampleAddr: string) => {
    setAddress(exampleAddr);
  };

  return (
    <div className="border-2 border-black bg-white">
      <div className="bg-black text-white p-3 border-b-2 border-black">
        <h3 className="font-bold">{title}</h3>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-600">{description}</p>

        {/* Input Section */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Algorand Address:
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Paste an Algorand address here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
              disabled={isLoading}
            />
          </div>

          {/* Example Addresses */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500">Try examples:</span>
            <button
              onClick={() =>
                fillExampleAddress(
                  "TESTACCOUNT1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                )
              }
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              disabled={isLoading}
            >
              TestAccount1
            </button>
            <button
              onClick={() =>
                fillExampleAddress(
                  "DEVWALLET2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                )
              }
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              disabled={isLoading}
            >
              DevWallet2
            </button>
            <button
              onClick={() =>
                fillExampleAddress(
                  "ALGORANDDEVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                )
              }
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              disabled={isLoading}
            >
              AlgorandDev
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleQuery}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isLoading ? "🔍 Querying..." : "Query Assets"}
            </button>

            {hasQueried && (
              <button
                onClick={handleClear}
                className="px-4 py-2 rounded-md font-medium text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {queryResult && (
          <div className="mt-4">
            <div className="bg-gray-900 text-green-400 p-4 rounded-md">
              <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed">
                {queryResult}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
