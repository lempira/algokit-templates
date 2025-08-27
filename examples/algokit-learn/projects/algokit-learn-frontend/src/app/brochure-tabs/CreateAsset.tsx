import useAssetCreation from "@/tutorials/app-tutorials/asset-creation";
import CodeTutorial from "@/components/CodeTutorial";
import AssetCreationDemo from "../demos/AssetCreation";
import arc3PlaceholderCode from "./arc3PlaceholderCode";

export default function AssetCreationTutorial() {
  const demoSection = <AssetCreationDemo />;

  // Use subTabs with codeTabs, matching the connectWallet tutorial pattern
  const subTabs = [
    {
      id: "native_asset",
      label: "Native Asset",
      tutorialSteps: useAssetCreation.native_asset.tutorialSteps,
      codeExample: useAssetCreation.native_asset.codeTabs[0]?.content || "",
      codeTabs: useAssetCreation.native_asset.codeTabs,
      disabled: false,
    },
    {
      id: "arc3_placeholder",
      label: "ARC3 (coming soon)",
      tutorialSteps: [
        {
          stepName: "ARC3 Asset Creation (Coming Soon)",
          stepDescription:
            "This tutorial will guide you through creating an ARC3-compliant asset using the native asset creation flow. Stay tuned!",
        },
      ],
      codeExample: arc3PlaceholderCode,
      codeTabs: [
        {
          id: "arc3_placeholder",
          label: "ARC3Asset.ts",
          language: "typescript",
          filename: "ARC3Asset.ts",
          content: arc3PlaceholderCode,
        },
      ],
      disabled: true,
    },
  ];

  return (
    <CodeTutorial
      title="Step 2: Learn How to Create Assets on Algorand"
      description="Understanding asset creation enables you to build NFTs and fungible tokens following native_asset and ARC69 standards."
      codeExample={useAssetCreation.native_asset.codeTabs[0]?.content || ""}
      tutorialSteps={useAssetCreation.native_asset.tutorialSteps}
      demoSection={demoSection}
      packagesInfo={useAssetCreation.native_asset.packagesInfo}
      codeTabs={useAssetCreation.native_asset.codeTabs}
      subTabs={subTabs}
    />
  );
}
