const useWalletConnection = {
  title: "Step 1: Learn How to Connect Wallets to Your App",
  description:
    "Understanding wallet connection is the first step in building Algorand applications. Learn step-by-step how to integrate wallet connectivity.",
  category: "wallet-connection",
  codeTabs: [
    {
      id: "main",
      label: "providers.tsx",
      language: "typescript",
      filename: "providers.tsx",
      content: `import {
  NetworkId,
  WalletId,
  WalletManager,
  WalletProvider,
} from "@txnlab/use-wallet-react";

const walletManager = new WalletManager({
  wallets: [
    {{SELECTED_WALLETS}}
  ],
  defaultNetwork: NetworkId.{{NETWORK_TYPE}},
});

export function WalletProviders({ children }: { children: React.ReactNode }) {
  return <WalletProvider manager={walletManager}>{children}</WalletProvider>;
}
`,
    },
    {
      id: "app",
      label: "App.tsx",
      language: "typescript",
      filename: "App.tsx",
      content: `import { WalletProvider } from "@txnlab/use-wallet-react";
       
export default function App() {
  return (
    <WalletProviders>
    {children}
    </WalletProviders>
  );
}
`,
    },
    {
      id: "connect-dropdown",
      label: "ConnectDropdown.tsx",
      language: "typescript",
      filename: "ConnectDropdown.tsx",
      content: `import { useWallet } from "@txnlab/use-wallet-react";
import { useState } from "react";
import Image from "next/image";
import { MdDoorBack } from "react-icons/md";

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
          {activeAccount.address}
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
`,
    },
    {
      id: "package",
      label: "Package",
      language: "json",
      filename: "package.json",
      content: `{
  "name": "algorand-wallet-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@txnlab/use-wallet-react": "^3.0.0",
    "algosdk": "^2.7.0",
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": x"^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0",
    "tailwindcss": "^3.3.0"
  }
}`,
    },
  ],
  tutorialSteps: [
    {
      stepName: "Import wallet connection libraries",
      stepDescription: `Import WalletManager and all required components for connecting wallets from '@txnlab/use-wallet-react' including NetworkId, WalletId, WalletManager, and WalletProvider. These handle the core wallet connection logic.`,
      codeTab: "main",
      fileReference: "providers.tsx",
      lineRange: { start: 1, end: 6 },
    },
    {
      stepName: "Configure Wallet Manager",
      stepDescription: `Configure Wallet Manager with new WalletManager providing an array with the wallets you want your app to support. You can also define the Network for your app`,
      codeTab: "main",
      fileReference: "providers.tsx",
      lineRange: { start: 8, end: 14 },
      editableFields: [
        {
          id: "network",
          label: "Network Type",
          placeholder: "TESTNET",
          defaultValue: "TESTNET",
          targetPattern: "{{NETWORK_TYPE}}",
          description: "Choose the network for your application",
          type: "dropdown" as const,
          options: ["MAINNET", "TESTNET", "LOCALNET"],
        },
        {
          id: "wallets",
          label: "Supported Wallets",
          placeholder: "Select wallets",
          defaultValue: "WalletId.PERA,WalletId.DEFLY",
          targetPattern: "{{SELECTED_WALLETS}}",
          description: "Choose which wallets your users can connect with",
          type: "checkbox" as const,
          options: [
            "WalletId.PERA",
            "WalletId.DEFLY",
            "WalletId.LUTE",
            "WalletId.DAFFI",
          ],
          defaultSelectedOptions: ["WalletId.PERA", "WalletId.DEFLY"],
        },
      ],
    },
    {
      stepName: "Export Wallet Provider Component",
      stepDescription: `Create a WalletManager instance specifying which wallets to support and set the network. You can customize both the network type and which wallets to enable.`,
      codeTab: "main",
      fileReference: "providers.tsx",
      lineRange: { start: 16, end: 19 },
    },
    {
      stepName: "Wrap app with Provider from providers.tsx",
      stepDescription: `Wrap your entire application with Provider to enable wallet functionality throughout your app`,
      codeTab: "app",
      fileReference: "App.tsx",
      lineRange: { start: 5, end: 7 },
    },
    {
      stepName: "Create Wallet Connection dropdown",
      stepDescription: `Switch to the App.tsx code tab and highlight the entire file to see a simple working example for connecting wallets in a React app.`,
      codeTab: "connect-dropdown",
      fileReference: "ConnectDropdown.tsx",
      lineRange: { start: 6, end: 82 },
    },
  ],
  packagesInfo: [
    {
      name: "@txnlab/use-wallet-react",
      version: "3.0.0",
      description:
        "A React library that provides wallet connection and management functionality for Algorand applications.",
      purpose:
        "Handles wallet connections, transaction signing, and provides React hooks for wallet state management across multiple Algorand wallets.",
      installation: "npm install @txnlab/use-wallet-react",
      documentation: "https://github.com/TxnLab/use-wallet",
    },
    {
      name: "@txnlab/use-wallet-ui-react",
      version: "3.0.0",
      description:
        "Pre-built UI components for wallet interactions, designed to work seamlessly with use-wallet-react.",
      purpose:
        "Provides ready-to-use components like WalletButton and WalletUIProvider to quickly add wallet functionality to your UI.",
      installation: "npm install @txnlab/use-wallet-ui-react",
      documentation: "https://github.com/TxnLab/use-wallet",
    },
    {
      name: "Pera Wallet",
      version: "Latest",
      description:
        "The official Algorand mobile wallet with dApp connector support.",
      purpose:
        "One of the most popular Algorand wallets that supports QR code connections for web applications.",
      installation: "Install from App Store or Google Play",
      documentation: "https://perawallet.app/",
    },
    {
      name: "Defly Wallet",
      version: "Latest",
      description:
        "A feature-rich Algorand wallet with advanced DeFi capabilities.",
      purpose:
        "Supports advanced features like portfolio tracking and DeFi integrations, popular among power users.",
      installation: "Install from App Store or Google Play",
      documentation: "https://defly.app/",
    },
    {
      name: "Lute Wallet",
      version: "Latest",
      description:
        "A lightweight and user-friendly Algorand wallet focused on simplicity.",
      purpose:
        "Provides a clean interface for basic wallet operations and dApp connections.",
      installation: "Install from App Store or Google Play",
      documentation: "https://lute.app/",
    },
    {
      name: "Daffi Wallet",
      version: "Latest",
      description:
        "An innovative Algorand wallet with unique features and design.",
      purpose:
        "Offers specialized functionality for Algorand ecosystem interactions.",
      installation: "Install from App Store or Google Play",
      documentation: "https://daffi.me/",
    },
  ],
  codeExample: `import {
  NetworkId,
  WalletId,
  WalletManager,
  WalletProvider,
} from '@txnlab/use-wallet-react'
import { WalletUIProvider, WalletButton } from '@txnlab/use-wallet-ui-react'

// Optional: Import pre-built styles if not using Tailwind
// import '@txnlab/use-wallet-ui-react/dist/style.css'

// Configure the wallets you want to use
const walletManager = new WalletManager({
  wallets: [
    {{SELECTED_WALLETS}}
  ],
  defaultNetwork: NetworkId.{{NETWORK_TYPE}},
})

function App() {
  return (
    <WalletProvider manager={walletManager}>
      <WalletUIProvider>
        <div className="min-h-screen bg-white text-black">
          <nav className="border-b-2 border-black p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">{{APP_TITLE}}</h1>
              <div className="flex gap-6">
                <WalletButton />
              </div>
            </div>
          </nav>
          
          <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Your Algorand App</h2>
            <p>Your wallet connection is ready!</p>
          </div>
        </div>
      </WalletUIProvider>
    </WalletProvider>
  )
}`,
};
export default useWalletConnection;
