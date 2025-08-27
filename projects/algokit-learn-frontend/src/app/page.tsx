"use client";

import { useState } from "react";
import WalletConnectionTutorial from "./brochure-tabs/WalletConnection";
import AssetCreationTutorial from "./brochure-tabs/CreateAsset";
import QueryingChainTutorial from "./brochure-tabs/QueryingChain";
import BrochureTabSelector from "@/components/BrochureTabSelector";
import { FaBookAtlas } from "react-icons/fa6";
import Image from "next/image";
import WalletConnectionButton from "@/components/WalletConnectionButton";
export default function Home() {
  const [activeTab, setActiveTab] = useState("connect-wallet");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    // <WalletProvider manager={walletManager}>
    <div className="bg-white text-black">
      {/* Navbar */}
      <nav className="border-b-2 border-brand-blue-primary bg-brand-blue-secondary p-4">
        <div className="px-40 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 overflow-hidden rounded-md">
              <Image
                src={`${basePath}/ak_logo.png`}
                alt="Algokit Logo"
                width={120}
                height={120}
              />
            </div>
            <h2 className="text-3xl font-bold">Learn</h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Testnet Indicator Pill */}
            <div className="flex items-center gap-1 bg-yellow-100 border border-yellow-300 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-800 text-sm font-medium">
                TestNet
              </span>
            </div>
            <WalletConnectionButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-2 md:px-40 lg:px-40 py-6">
        <BrochureTabSelector
          setterFunction={setActiveTab}
          activeTab={activeTab}
        />

        {/* Tab Content */}
        {activeTab === "connect-wallet" && <WalletConnectionTutorial />}
        {activeTab === "transactions" && <AssetCreationTutorial />}
        {activeTab === "querying-chain" && <QueryingChainTutorial />}
      </div>
    </div>
    // </WalletProvider>
  );
}
