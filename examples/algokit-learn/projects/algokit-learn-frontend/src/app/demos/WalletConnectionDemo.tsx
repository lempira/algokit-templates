import WalletConnectionButton from "@/components/WalletConnectionButton";
import { useWallet } from "@txnlab/use-wallet-react";
import Image from "next/image";
import { MdAccountBalanceWallet, MdCheckCircle } from "react-icons/md";

export default function WalletConnectionDemo() {
  const { wallets, activeAccount } = useWallet();

  return (
    <div className="border-2 border-brand-blue-primary bg-brand-blue-secondary rounded-md">
      <div className="bg-brand-blue-primary text-white p-3 border-b-2 border-brand-blue-primary">
        <h3 className="font-bold">Wallet connection</h3>
      </div>
      <div className="p-6">
        {/* Subtle informational message */}
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-700">
            <strong>💡 Tip:</strong> Connect a wallet to enable blockchain interactions
          </p>
        </div>

        <div className="text-center">
          <WalletConnectionButton />

          {activeAccount && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center justify-center mb-2">
                <MdCheckCircle className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-700">Connected</span>
              </div>
              
              <div className="text-xs text-gray-600 font-mono bg-white p-2 rounded border break-all">
                {activeAccount.address}
              </div>
              
              <div className="mt-2 text-center">
                <a
                  href={`https://lora.algokit.io/testnet/account/${activeAccount.address}`}
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
      </div>
    </div>
  );
}
