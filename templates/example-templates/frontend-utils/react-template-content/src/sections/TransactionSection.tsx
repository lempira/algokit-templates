import CodeBlock from "../components/CodeBlock";
import Feature from "../components/Feature";

export default function TransactionSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Transaction Operations</h2>

      <p className="mb-4">
        AlgoKit Utils provides powerful abstractions for creating, sending, and managing Algorand transactions, making it easier to handle
        complex transaction scenarios.
      </p>

      <Feature title="Basic Transactions">
        <p className="mb-2">Create and send basic payment transactions:</p>
        <CodeBlock>{`// Simple payment transaction
  await algorand.send.payment({
    sender: senderAccount,
    receiver: receiverAddress,
    amount: algokit.algos(1)
  });
  
  // Create a transaction without sending
  const txn: algosdk.Transaction = await algorand.createTransaction.payment({
    sender: senderAccount.addr,
    receiver: receiverAddress,
    amount: algokit.algos(1)
  });`}</CodeBlock>
      </Feature>

      <Feature title="Transaction Groups">
        <p className="mb-2">Create atomic transaction groups (up to 16 transactions that all succeed or fail together):</p>
        <CodeBlock>{`// Create a transaction group
  const result: algokit.SendTransactionGroupResults = await algorand.newGroup()
    .addPayment({
      sender: account,
      receiver: receiverAddress,
      amount: algokit.algos(1)
    })
    .addPayment({
      sender: account,
      receiver: otherAddress,
      amount: algokit.algos(0.5)
    })
    .send();`}</CodeBlock>
      </Feature>

      <Feature title="Transaction Control">
        <p className="mb-2">Finely control transaction parameters:</p>
        <CodeBlock>{`// Specify fees and other transaction parameters
  await algorand.send.payment({
    sender: account,
    receiver: receiverAddress,
    amount: algokit.algos(1),
    maxFee: algokit.algos(0.002),  // Cap maximum fee
    staticFee: algokit.algos(0.001),  // Use a specific fee
    note: "Payment for services",
    lease: "unique-lease-id"  // Prevent duplicate transactions
  })`}</CodeBlock>
      </Feature>

      <Feature title="Transaction Simulation">
        <p className="mb-2">Simulate transactions before sending to validate behavior:</p>
        <CodeBlock>{`// Get a group of transactions ready to simulate
  const group = algorand.newGroup()
    .addPayment({ /* payment details */ })
    .addAppCall({ /* app call details */ });
  
  // Simulate the transaction group to check for issues
  const simulateResult: algosdk.modelsv2.SimulateResponse = await group.simulate();`}</CodeBlock>
      </Feature>

      <Feature title="Waiting for Confirmation">
        <p className="mb-2">Wait for transaction confirmation and get detailed results:</p>
        <CodeBlock>{`// Send and wait for confirmation
  const result = await algorand.send.payment({
    sender: account,
    receiver: receiverAddress,
    amount: algokit.algos(1)
  })
  
  // Access confirmation details
  console.log(\`Transaction confirmed in round \${result.confirmation.confirmedRound}\`)
  
  // With transaction groups
  const groupResult = await algorand.newGroup()
    .addPayment({ /* details */ })
    .addPayment({ /* details */ })
    .send()
  
  // All confirmations in the group
  console.log(groupResult.confirmations)
  console.log(groupResult.txIds) // Transaction IDs`}</CodeBlock>
      </Feature>
    </div>
  );
}
