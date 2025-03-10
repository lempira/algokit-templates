import CodeBlock from "../components/CodeBlock";
import Feature from "../components/Feature";

export default function TestingSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Testing Utilities</h2>

      <p className="mb-4">
        AlgoKit Utils includes robust testing tools that make it easier to write automated tests for Algorand applications, with built-in
        fixtures and helpers for common testing scenarios.
      </p>

      <Feature title="Test Accounts">
        <p className="mb-2">Create and fund test accounts easily:</p>
        <CodeBlock>{`// Create a test account with initial funding
  const testAccount: algosdk.Account & algosdk.Address & algokit.TransactionSignerAccount = await algokit.getTestAccount(
    { 
      initialFunds: algokit.algos(10),
      suppressLog: true 
    },
    algorand
  );
  
  // Now you can use this account in your tests
  console.log(\`Test account address: \${testAccount.addr}\`);`}</CodeBlock>
      </Feature>
    </div>
  );
}
