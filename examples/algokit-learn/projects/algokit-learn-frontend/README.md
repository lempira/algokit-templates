# AK Learn

**AK Learn** is an interactive learning platform built with **Next.js** to showcase the capabilities of [AlgoKit Utils](https://github.com/algorandfoundation/algokit-utils).  
It serves as a **lightweight, interactive brochure** designed to onboard developers into the Algorand ecosystem through live, hands-on demos.

---

## ✨ What is AK Learn?

As part of the effort to bring **Next.js to AlgoKit**, AK Learn was created to:

- Provide **fully interactive tutorials** for Algorand developers.
- Show step-by-step demos of **wallet connections, asset creation, blockchain queries**, and more.
- Act as both a **teaching tool** and a **reference framework** for building Algorand apps with AlgoKit.

Developers can:

- Hover over tutorial steps to **highlight the exact lines of code**.
- Switch between **code tabs** (e.g., `providers.tsx`, `App.tsx`, `ConnectDropdown.tsx`).
- Copy step-specific code snippets with a single click.

---

## 📚 Features

- 🦾 **Interactive tutorials** — step-by-step guides mapped directly into code snippets.
- 🎨 **Code highlighting & tab switching** — hovering a step highlights the relevant lines and switches to the right file.
- ⚡ **Copy-friendly snippets** — grab exactly the code you need, step by step.
- 🧩 **Extensible architecture** — add new tutorials easily by providing a `.ts` file with a structured object definition.
- 🛠️ **AlgoKit Utils showcase** — learn wallet integration, asset creation, and blockchain querying (with more on the way).

---

## 🛠 Example Tutorial Definition

Each tutorial is defined in a simple `.ts` file that maps **categories**, **code tabs**, and **tutorial steps**.

```ts
const useWalletConnection = {
  category: "wallet-connection",
  codeTabs: [
    {
      id: "main",
      label: "providers.tsx",
      language: "typescript",
      filename: "providers.tsx",
      content: `import {
  NetworkId,
  WalletId,
  WalletManager,
  WalletProvider,
} from "@txnlab/use-wallet-react";

// configure wallet manager
const walletManager = new WalletManager({ ... });

export function WalletProviders({ children }: { children: React.ReactNode }) {
  return <WalletProvider manager={walletManager}>{children}</WalletProvider>;
}
`,
    },
    // More tabs like App.tsx, ConnectDropdown.tsx, package.json...
  ],
  tutorialSteps: [
    {
      stepName: "Import wallet connection libraries",
      stepDescription: "Import WalletManager and required components...",
      codeTab: "main",
      fileReference: "providers.tsx",
      lineRange: { start: 1, end: 6 },
    },
    // More step definitions...
  ],
};
export default useWalletConnection;
```

---

## 🚧 Current Progress

- ✅ **Wallet Connection** tutorial — nearly complete.
- 🚧 **Asset Creation** tutorial — work in progress.
- 🚧 **Blockchain Querying** tutorial — work in progress.
- 🔮 **Future Tutorials** — more AlgoKit utilities (to be added soon).

---

## 🎯 Target Audience

AK Learn is designed for:

- **New Algorand developers** who want to quickly get hands-on with AlgoKit.
- **Frontend engineers** (React/Next.js) exploring how to integrate Algorand utilities.
- **Teams adopting Algorand** looking for clear, interactive learning material.
- **Educators and trainers** who want structured, highlight-driven code tutorials.

---

## 🔌 Tech Stack

- **Next.js** — interactive React-based frontend.
- **TailwindCSS** — styling and layout.
- **AlgoKit Utils** — Algorand developer utilities.
- **@txnlab/use-wallet-react** — wallet integration hooks.

---
