import useWalletConnection from "@/tutorials/app-tutorials/wallet-connection";
import CodeTutorial from "@/components/CodeTutorial";
import DemoSection from "@/components/DemoSection";
import WalletConnectionDemo from "../demos/WalletConnectionDemo";
import { use } from "react";

export default function WalletConnectionTutorial() {
  const demoSection = <WalletConnectionDemo />;

  return (
    <CodeTutorial
      title={useWalletConnection.title}
      description={useWalletConnection.description}
      codeExample={useWalletConnection.codeExample}
      tutorialSteps={useWalletConnection.tutorialSteps}
      demoSection={demoSection}
      packagesInfo={useWalletConnection.packagesInfo}
      codeTabs={useWalletConnection.codeTabs}
      editableFields={[
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
      ]}
    />
  );
}
