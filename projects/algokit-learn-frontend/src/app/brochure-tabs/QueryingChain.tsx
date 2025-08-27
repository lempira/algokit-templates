import useQueryingChain from "@/tutorials/app-tutorials/querying-chain";
import CodeTutorial from "@/components/CodeTutorial";
import InteractiveQueryDemo from "@/components/InteractiveQueryDemo";
import QueryAssetTutorial from "../demos/QueryAsset";

export default function QueryingChainTutorial() {
  const demoSection = <QueryAssetTutorial />;

  const subTabs = [
    {
      id: "accountInfo",
      label: "Account Info",
      tutorialSteps: [
        useQueryingChain.tutorialSteps[0], // Import Algorand Client
        useQueryingChain.tutorialSteps[1], // Import Dependencies for Account Query
        useQueryingChain.tutorialSteps[2], // Define Account Query Function
        useQueryingChain.tutorialSteps[3], // Execute Account Query
        useQueryingChain.tutorialSteps[4], // Import React Dependencies
        useQueryingChain.tutorialSteps[5], // Setup Component State
        useQueryingChain.tutorialSteps[6], // Handle Account Query Execution
        useQueryingChain.tutorialSteps[7], // Render Account Query Form
      ],
      codeExample:
        useQueryingChain.codeTabs.find((tab) => tab.id === "algorandClient")
          ?.content || "",
      codeTabs: useQueryingChain.codeTabs.filter(
        (tab) => 
          tab.id === "algorandClient" || 
          tab.id === "accountInfo" || 
          tab.id === "accountInfoComponent"
      ),
      disabled: false,
    },
    {
      id: "assetLookup",
      label: "Asset Lookup",
      tutorialSteps: [
        useQueryingChain.tutorialSteps[8],  // Import Algorand Client
        useQueryingChain.tutorialSteps[9],  // Import Dependencies for Asset Query
        useQueryingChain.tutorialSteps[10], // Define Asset Query Function
        useQueryingChain.tutorialSteps[11], // Execute Asset Query
        useQueryingChain.tutorialSteps[12], // Import React Dependencies
        useQueryingChain.tutorialSteps[13], // Setup Component State
        useQueryingChain.tutorialSteps[14], // Handle Asset Query Execution
        useQueryingChain.tutorialSteps[15], // Render Asset Query Form
      ],
      codeExample:
        useQueryingChain.codeTabs.find((tab) => tab.id === "algorandClient")
          ?.content || "",
      codeTabs: useQueryingChain.codeTabs.filter(
        (tab) => 
          tab.id === "algorandClient" || 
          tab.id === "assetLookup" || 
          tab.id === "assetLookupComponent"
      ),
      disabled: false,
    },
  ];

  return (
    <CodeTutorial
      title="Step 3: Learn How to Query the Blockchain"
      description="Discover how to retrieve account information and asset data from the Algorand blockchain."
      codeExample={useQueryingChain.codeTabs[0]?.content || ""}
      tutorialSteps={useQueryingChain.tutorialSteps}
      demoSection={demoSection}
      codeTabs={useQueryingChain.codeTabs}
      subTabs={subTabs}
      packagesInfo={useQueryingChain.packagesInfo}
    />
  );
}
