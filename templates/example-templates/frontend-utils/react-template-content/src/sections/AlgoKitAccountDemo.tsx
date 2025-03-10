import { useState, useEffect } from "react";
import { AlgorandClient } from "@algorandfoundation/algokit-utils";
import algosdk from "algosdk";
import Feature from "../components/Feature";
import CodeBlock from "../components/CodeBlock";

const AlgoKitAccountDemo = () => {
  const [algorand, setAlgorand] = useState<AlgorandClient | null>(null);
  const [account, setAccount] = useState<ReturnType<AlgorandClient["account"]["random"]> | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const client = AlgorandClient.defaultLocalNet();
    setAlgorand(client);
  }, []);

  const createRandomAccount = (): void => {
    try {
      setError("");
      if (!algorand) return;

      const newAccount = algorand.account.random();
      setAccount(newAccount);

      // Clear any previous transaction info
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="p-4">
      <Feature title="Creating Accounts">
        <p className="mb-2">Generate random accounts or import existing ones:</p>
        <CodeBlock>
          {`// Generate a random account
const account: algosdk.Account = algorand.account.random();
  
// Create an account from a mnemonic
const mnemonicAccount: algosdk.Account = algorand.account.fromMnemonic("your mnemonic phrase here");`}
        </CodeBlock>
        <button onClick={createRandomAccount} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Create Random Account
        </button>
        {!account && <p>Click Button to Create an Account</p>}
        {account && (
          <div className="mt-4">
            <p>
              <span className="font-bold">Address:</span> {account.addr.toString()}
            </p>
            <p>
              <span className="font-bold">Mnemonic:</span> {algosdk.secretKeyToMnemonic(account.account.sk)}
            </p>
          </div>
        )}
      </Feature>
    </div>
  );
};

export default AlgoKitAccountDemo;
