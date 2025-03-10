import CodeBlock from "../components/CodeBlock";
import Feature from "../components/Feature";

export default function IntroductionSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Introduction to AlgoKit Utils</h2>

      <p className="mb-4">
        AlgoKit Utils is a versatile TypeScript library that simplifies Algorand blockchain development. It provides a collection of
        utilities to make common Algorand operations easier, faster, and more reliable.
      </p>

      <Feature title="What is AlgoKit Utils?">
        <p>
          AlgoKit Utils acts as a wrapper around the official Algorand JavaScript SDK (algosdk) to provide higher-level abstractions and
          simplify common tasks. It's designed to be the foundation for Algorand dApp development, offering utilities for account
          management, transaction handling, smart contract interaction, and more.
        </p>
      </Feature>

      <Feature title="Key Components">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Account Management:</strong> Create, manage, and fund Algorand accounts
          </li>
          <li>
            <strong>Transaction Operations:</strong> Send payments, asset transfers, and atomic transactions
          </li>
          <li>
            <strong>Asset Operations:</strong> Create, opt-in, and manage Algorand Standard Assets (ASAs)
          </li>
          <li>
            <strong>Testing Utilities:</strong> Tools to make testing Algorand applications easier
          </li>
        </ul>
      </Feature>

      <Feature title="Getting Started">
        <p className="mb-2">Install AlgoKit Utils in your project:</p>
        <CodeBlock>npm install @algorandfoundation/algokit-utils</CodeBlock>

        <p className="mb-2">Basic usage example:</p>
        <CodeBlock>{`import * as algokit from '@algorandfoundation/algokit-utils';
  import algosdk from 'algosdk';
  
  // Create an algod client
  const algod: algosdk.Algodv2 = new algosdk.Algodv2('', 'https://node.testnet.algoexplorerapi.io', '');
  
  // Create a new Algorand client from the algod client
  const algorand: algokit.AlgorandClient = algokit.AlgorandClient.fromClients({ algod });`}</CodeBlock>
      </Feature>
    </div>
  );
}
