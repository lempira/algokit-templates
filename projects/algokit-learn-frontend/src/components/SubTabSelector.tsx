import { SubTabData } from "./CodeTutorial";

interface SubTabSelectorProps {
  subTabs: SubTabData[];
  activeSubTab: string;
  onSubTabChange: (subTabId: string) => void;
}

export default function SubTabSelector({
  subTabs,
  activeSubTab,
  onSubTabChange,
}: SubTabSelectorProps) {
  if (!subTabs || subTabs.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="flex gap-1 rounded-md overflow-hidden">
        {subTabs.map((subTab) => {
          const isDisabled = Boolean((subTab as any).disabled);
          return (
            <button
              key={subTab.id}
              onClick={() => {
                if (!isDisabled) onSubTabChange(subTab.id);
              }}
              className={`px-3 py-2 text-sm font-medium border- focus:outline-none ${
                isDisabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                  : activeSubTab === subTab.id
                  ? "bg-brand-blue-primary text-white border-b-2 border-white cursor-pointer"
                  : "bg-gray-100 text-black hover:bg-gray-200 cursor-pointer"
              }`}
              disabled={isDisabled}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
            >
              {subTab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
