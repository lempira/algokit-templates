import { PropsWithChildren } from "react";

interface Props {
  title: string;
}

export default function Feature({ title, children }: PropsWithChildren<Props>) {
  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">{title}</h3>
      {children}
    </div>
  );
}
