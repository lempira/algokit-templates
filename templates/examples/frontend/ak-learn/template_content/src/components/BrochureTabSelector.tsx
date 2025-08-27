import Image from "next/image";

interface BrochureTabSelectorProps {
  activeTab: string;
  setterFunction: (tab: string) => void;
}

export default function BrochureTabSelector({
  setterFunction,
  activeTab,
}: BrochureTabSelectorProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  
  const brochureTabs = [
    {
      name: "Easily connecting Wallets",
      value: "connect-wallet",
      icon: `${basePath}/wallet-icon.png`,
    },
    {
      name: "Creating Assets",
      value: "transactions",
      icon: `${basePath}/coin-icon.png`,
    },
    {
      name: "Querying the blockchain",
      value: "querying-chain",
      icon: `${basePath}/cloud-icon.png`,
    },
  ];

  return (
    <div className="">
      <div className="flex gap-0">
        <div className="flex rounded-t-md overflow-hidden border-b-2 border-brand-blue-primary">
          {brochureTabs.map((tab) => {
            return (
              <button
                key={tab.value}
                onClick={() => setterFunction(tab.value)}
                className={`px-6 py-3 border-b-0 font-medium flex flex-col md:flex-row lg:flex-row items-center gap-2 ${
                  activeTab === tab.value
                    ? "bg-brand-blue-primary text-white" // Use custom color for active tab
                    : "bg-brand-blue-secondary text-black hover:bg-gray-100"
                }`}
              >
                <Image
                  src={tab.icon}
                  alt={`${tab.name} icon`}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
