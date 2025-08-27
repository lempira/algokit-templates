import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";

interface DemoSectionProps {
  title: string;
  description: string;
  buttonText: string;
  initialOutput: string;
  simulationOutput: string;
}

export default function DemoSection({
  title,
  description,
  buttonText,
  initialOutput,
  simulationOutput,
}: DemoSectionProps) {
  const [output, setOutput] = useState(initialOutput);

  const handleDemoClick = () => {
    setOutput(simulationOutput);
  };

  return (
    <div className="border-2 border-brand-blue-primary bg-brand-blue-secondary rounded-md">
      <div className="bg-brand-blue-primary text-white p-3 border-b-2 border-brand-blue-primary">
        <h3 className="font-bold">{title}</h3>
      </div>
      <div className="p-6 text-center">
        <p className="mb-4 text-gray-600">{description}</p>
        <button
          onClick={handleDemoClick}
          className="bg-brand-blue-primary text-white cursor-pointer rounded-md px-6 py-3 font-bold hover:bg-black hover:text-white transition-colors"
        >
          {buttonText}
        </button>
        <div className="mt-4 p-0 bg-green-100 border-2 border-gray-300 text-left">
          <SyntaxHighlighter
            language="javascript"
            style={tomorrow}
            customStyle={{
              margin: 0,
              backgroundColor: "#f9fafb",
              padding: "1rem",
              fontSize: "0.75rem",
              lineHeight: "1rem",
            }}
            showLineNumbers={false}
          >
            {output}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
