import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface LineRange {
  start: number;
  end: number;
}

interface CodeDisplayProps {
  code: string;
  hoveredStep: number | null;
  clickedStep: number | null;
  stepLineRanges: LineRange[];
  copySuccess: boolean;
  onCopyCode: () => void;
}

export default function CodeDisplay({
  code,
  hoveredStep,
  clickedStep,
  stepLineRanges,
  copySuccess,
  onCopyCode,
}: CodeDisplayProps) {
  // Function for lineProps that works with react-syntax-highlighter
  const getLineProps = (lineNumber: number) => {
    // Prioritize clicked step over hovered step
    const activeStep = clickedStep !== null ? clickedStep : hoveredStep;

    if (activeStep === null) return {};

    const range = stepLineRanges[activeStep];
    if (range && lineNumber >= range.start && lineNumber <= range.end) {
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

  return (
    <div className="border-2 col-span-2 border-black">
      <div className="bg-black text-white p-3 border-b-2 border-black">
        <h3 className="font-bold">Code Example</h3>
      </div>
      <div className="p-0 bg-gray-50 relative">
        {/* Copy button positioned over the selected code */}
        {clickedStep !== null && (
          <button
            onClick={onCopyCode}
            className={`absolute top-2 right-2 z-10 px-3 py-2 text-xs font-medium rounded-md shadow-md transition-all duration-200 ${
              copySuccess
                ? "bg-green-500 text-white"
                : "bg-white/50 border-2 border-orange-400 text-orange-600 hover:bg-orange-50"
            }`}
            title={`Copy lines ${stepLineRanges[clickedStep].start}-${stepLineRanges[clickedStep].end}`}
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
        )}
        <SyntaxHighlighter
          data-testid="code-display"
          language="javascript"
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
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
