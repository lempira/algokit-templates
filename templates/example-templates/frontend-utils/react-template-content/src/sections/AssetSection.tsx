import CodeBlock from "../components/CodeBlock";
import Feature from "../components/Feature";

export default function AssetSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Asset Operations</h2>

      <p className="mb-4">
        AlgoKit Utils provides simplified interfaces for working with Algorand Standard Assets (ASAs), including creation, opt-in,
        transfers, and management.
      </p>

      <Feature title="Creating Assets">
        <p className="mb-2">Create a new Algorand Standard Asset (ASA):</p>
        <CodeBlock>{`// Create a new asset
  const assetResult: algokit.SendTransactionResult & {
    confirmation?: { assetIndex: bigint };
  } = await algorand.send.assetCreate({
    sender: creatorAccount,
    total: 1000000n, // Total supply
    decimals: 2, // Decimal precision
    defaultFrozen: false,
    assetName: "My Token",
    unitName: "TOKEN"
  });
  
  // Get the new asset ID
  const assetId: bigint = assetResult.confirmation?.assetIndex || 0n;`}</CodeBlock>
      </Feature>

      <Feature title="Asset Opt-In">
        <p className="mb-2">Opt accounts in to receive specific assets:</p>
        <CodeBlock>{`// Opt an account into an asset
  await algorand.send.assetOptIn({
    sender: account,
    assetId: tokenId
  })
  
  // Bulk opt-in to multiple assets at once
  await algorand.asset.bulkOptIn(
    accountAddress,
    [asset1Id, asset2Id, asset3Id]
  )`}</CodeBlock>
      </Feature>

      <Feature title="Asset Transfers">
        <p className="mb-2">Transfer assets between accounts:</p>
        <CodeBlock>{`// Transfer assets
  await algorand.send.assetTransfer({
    sender: senderAccount,
    receiver: receiverAddress,
    assetId: tokenId,
    amount: 100n
  })
  
  // Clawback assets (if sender is the clawback address)
  await algorand.send.assetTransfer({
    sender: clawbackAccount,
    receiver: receiverAddress,
    assetId: tokenId,
    amount: 50n,
    clawbackTarget: targetAddress
  })`}</CodeBlock>
      </Feature>

      <Feature title="Asset Opt-Out">
        <p className="mb-2">Opt accounts out of assets:</p>
        <CodeBlock>{`// Opt out of an asset
  await algorand.send.assetOptOut({
    sender: account,
    assetId: tokenId,
    creator: creatorAddress // The address of the asset creator
  })
  
  // Bulk opt-out from multiple assets
  await algorand.asset.bulkOptOut(
    accountAddress,
    [asset1Id, asset2Id, asset3Id]
  )`}</CodeBlock>
      </Feature>

      <Feature title="Asset Information">
        <p className="mb-2">Retrieve asset information:</p>
        <CodeBlock>{`// Get asset information
  const assetInfo: algosdk.modelsv2.Asset = await algorand.asset.get(assetId);
  
  // Get information about an asset held by an account
  const assetHolding: algokit.AccountAssetInformation = await algorand.asset.getAccountInformation(
    accountAddress,
    assetId
  );`}</CodeBlock>
      </Feature>
    </div>
  );
}
