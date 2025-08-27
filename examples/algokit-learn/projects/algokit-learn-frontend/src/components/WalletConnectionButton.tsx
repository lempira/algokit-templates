import { useWallet } from "@txnlab/use-wallet-react";
import { useState } from "react";
import Image from "next/image";
import { MdDoorBack } from "react-icons/md";

/** Small helper to shorten long Algorand addresses for display */
function truncate(addr?: string, start = 6, end = 4) {
  if (!addr) return "";
  return `${addr.slice(0, start)}...${addr.slice(-end)}`;
}

export default function WalletConnectionButton() {
  // wallets: list of available wallet connectors
  // activeAccount: currently connected account (if any)
  // activeWallet: the connector used to connect (for disconnect)
  const { wallets, activeAccount, activeWallet } = useWallet();

  // Controls whether the wallet list (dropdown) is visible
  const [open, setOpen] = useState(false);

  /** Toggle dropdown visibility */
  const toggle = () => setOpen((v) => !v);

  /** If connected, show the address and a simple disconnect button */
  if (activeAccount?.address) {
    return (
      <div className="inline-flex overflow-hidden rounded-md border">
        <button
          type="button"
          className="px-3 py-2 text-sm bg-blue-600 text-white"
          title={activeAccount.address}
        >
          {truncate(activeAccount.address)}
        </button>
        <button
          type="button"
          className="px-2 bg-red-500 text-white"
          onClick={activeWallet?.disconnect}
          aria-label="Disconnect wallet"
          title="Disconnect"
        >
          <MdDoorBack />
        </button>
      </div>
    );
  }

  /** Not connected: show a Connect button; clicking opens the dropdown with options */
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={toggle}
        className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm"
      >
        Connect
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-56 rounded-md border bg-white shadow">
          <div className="py-1">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                type="button"
                // Connect to the selected wallet, then close the dropdown
                onClick={async () => {
                  try {
                    await wallet.connect();
                  } finally {
                    setOpen(false);
                  }
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50"
              >
                <Image
                  src={wallet.metadata.icon}
                  alt={wallet.metadata.name}
                  width={24}
                  height={24}
                />
                <span className="font-medium">{wallet.metadata.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
