import { PropsWithChildren } from "react";

export default function CodeBlock({ children }: PropsWithChildren) {
  return (
    <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto my-4 text-sm">
      <code>{children}</code>
    </pre>
  );
}
