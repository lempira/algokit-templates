import { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CodeTabData, EditableField, LineRange } from "./CodeTutorial";

interface CodeTabsProps {
  tabs: CodeTabData[];
  defaultTab?: string;
  fieldValues?: Record<string, string>;
  editableFields?: EditableField[];
  // Step highlighting props (optional)
  hoveredStep?: number | null;
  clickedStep?: number | null;
  // Now a map: tabId -> array of line ranges for steps in that tab
  stepLineRanges?: Record<string, LineRange[]>;
  onCopyCode?: () => void;
  copySuccess?: boolean;
  externalActiveTab?: string;
}

// (Removed duplicate function declaration. See below for correct function.)
export default function CodeTabs(props: CodeTabsProps) {
  const {
    tabs,
    defaultTab,
    fieldValues,
    editableFields,
    hoveredStep,
    clickedStep,
    stepLineRanges,
    onCopyCode,
    copySuccess = false,
    externalActiveTab,
  } = props;
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

  // Reset activeTab to first tab when tabs prop changes (e.g., when switching subtabs)
  useEffect(() => {
    setActiveTab(defaultTab || tabs[0]?.id || "");
  }, [tabs, defaultTab]);
  const [internalCopySuccess, setInternalCopySuccess] = useState(false);

  // Sync activeTab with externalActiveTab
  useEffect(() => {
    if (externalActiveTab && activeTab !== externalActiveTab) {
      setActiveTab(externalActiveTab);
    }
  }, [externalActiveTab]);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  // Function for lineProps that works with react-syntax-highlighter for any tab
  const getLineProps = (lineNumber: number) => {
    if (!stepLineRanges) return {};

    // Prioritize clicked step over hovered step
    const activeStep = clickedStep !== null ? clickedStep : hoveredStep;
    if (activeStep === null || activeStep === undefined) return {};

    // Get the line range for this step in the current tab
    const tabRanges = stepLineRanges[activeTab] || [];
    const range = tabRanges[activeStep];
    if (
      range &&
      range.start > 0 &&
      lineNumber >= range.start &&
      lineNumber <= range.end
    ) {
      // Use different colors for clicked vs hovered
      const backgroundColor = clickedStep !== null ? "#fbbf24" : "#fef3c7"; // orange for clicked, light yellow for hover

      return {
        style: {
          backgroundColor,
          display: "block",
          margin: "0 -1rem",
          padding: "0 1rem",
          borderRadius: "2px",
          transition: "background-color 0.2s ease",
        },
      };
    }
    return {};
  };

  // Apply field values to the content
  const applyFieldValues = (content: string) => {
    if (!fieldValues || !editableFields) return content;

    let updatedContent = content;

    editableFields.forEach((field) => {
      let value = fieldValues[field.id] || field.defaultValue;

      // Format checkbox values for wallet IDs
      if (field.type === "checkbox" && field.id === "wallets") {
        const selectedOptions = value.split(",").filter(Boolean);
        value = selectedOptions.join(",\n    ");
      }

      const regex = new RegExp(field.targetPattern, "g");
      updatedContent = updatedContent.replace(regex, value);
    });

    return updatedContent;
  };

  const handleCopyCode = async () => {
    if (!activeTabData) return;

    // If external copy handler is provided, use it
    if (onCopyCode) {
      onCopyCode();
      return;
    }

    // Otherwise, handle copy internally
    try {
      const processedContent = applyFieldValues(activeTabData.content);
      await navigator.clipboard.writeText(processedContent);
      setInternalCopySuccess(true);
      setTimeout(() => setInternalCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className="bg-brand-secondary/50">
      {/* Tab Headers */}
      <div className="bg-brand-blue-secondary overflow-x-scroll overflow-y-hidden text-white border-b-2 border-brand-blue-primary">
        <div className="flex border-l-2 border-brand-blue-primary">
          {tabs.map((tab) => (
            <button
              data-testid={
                activeTab === tab.id ? "active-code-tab" : `code-tab-${tab.id}`
              }
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-bold transition-colors border-r border-gray-600 last:border-r-0 ${
                activeTab === tab.id
                  ? "bg-brand-blue-primary text-white border-b-4 border-white scale-105"
                  : "bg-brand-blue-secondary text-black hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tab.label}</span>
                {tab.filename && (
                  <span className="text-xs opacity-75">({tab.filename})</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTabData && (
        <div className="p-0 bg-gray-50 relative">
          {/* Copy button - show step-specific copy for this tab/step if valid range, else full file copy */}
          {(() => {
            // Determine if we have a valid range for the current step in this tab
            const tabRanges = stepLineRanges
              ? stepLineRanges[activeTab] || []
              : [];
            const activeStep = clickedStep !== null ? clickedStep : hoveredStep;
            const range =
              activeStep !== null && activeStep !== undefined
                ? tabRanges[activeStep]
                : undefined;
            const hasValidRange =
              range && range.start > 0 && range.end >= range.start;
            if (
              hasValidRange &&
              clickedStep !== null &&
              clickedStep !== undefined
            ) {
              return (
                <button
                  onClick={handleCopyCode}
                  className={`absolute top-2 right-2 z-10 px-3 py-2 text-xs font-medium rounded-md shadow-md transition-all duration-200 ${
                    copySuccess
                      ? "bg-green-500 text-white"
                      : "bg-white/50 border-2 border-orange-400 text-orange-600 hover:bg-orange-50"
                  }`}
                  title={`Copy lines ${range.start}-${range.end}`}
                >
                  {copySuccess ? (
                    <span className="flex items-center gap-1">
                      <span>✓</span>
                      <span>Copied!</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span>📋</span>
                      <span>Copy code snippet</span>
                    </span>
                  )}
                </button>
              );
            } else {
              return (
                <button
                  onClick={handleCopyCode}
                  className={`absolute top-2 right-2 z-10 px-3 py-2 text-xs font-medium rounded-md shadow-md transition-all duration-200 ${
                    copySuccess || internalCopySuccess
                      ? "bg-green-500 text-white"
                      : "bg-white/50 border-2 border-blue-400 text-blue-600 hover:bg-blue-50"
                  }`}
                  title={`Copy ${
                    activeTabData.filename || activeTabData.label
                  }`}
                >
                  {copySuccess || internalCopySuccess ? (
                    <span className="flex items-center gap-1">
                      <span>✓</span>
                      <span>Copied!</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span>📋</span>
                      <span>Copy {activeTabData.label}</span>
                    </span>
                  )}
                </button>
              );
            }
          })()}

          <SyntaxHighlighter
            data-testid="code-display"
            language={activeTabData.language}
            style={tomorrow}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "#f9fafb",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              maxHeight: "100vh",
            }}
            showLineNumbers={true}
            wrapLines={true}
            lineProps={getLineProps}
          >
            {applyFieldValues(activeTabData.content)}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
