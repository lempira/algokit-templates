"""
Example tests for your smart contract.

This file shows common patterns for testing AlgoKit smart contracts.
Uncomment and modify the examples below to match your contract's methods and logic.
"""

# TODO: Uncomment imports when you're ready to write tests
# import pytest
# from algokit_utils import (
#     Account,
#     TransactionParameters,
#     get_localnet_default_account,
# )
# from algosdk.v2client.algod import AlgodClient

# TODO: Import your contract's client class
# from smart_contracts.your_contract.client import YourContractClient


# TODO: Create a fixture for your contract client
# @pytest.fixture
# def client(algod_client: AlgodClient, deployer: Account) -> YourContractClient:
#     """Create and deploy the contract for testing."""
#     client = YourContractClient(
#         algod_client,
#         creator=deployer,
#         indexer_client=None,
#     )
#
#     client.deploy(
#         on_schema_break="replace",
#         on_update="update",
#         allow_delete=True,
#         allow_update=True,
#     )
#
#     return client


# TODO: Test the initial state after deployment
# def test_initial_state(client: YourContractClient) -> None:
#     """Test the contract's initial state after deployment."""
#     assert client.app_id > 0
#
#     # Example: Check initial global state
#     # global_state = client.get_global_state()
#     # assert global_state.get("counter", 0) == 0


# TODO: Test your contract methods
# def test_your_method(client: YourContractClient) -> None:
#     """Test a specific contract method."""
#     # Example: Call a method and check the result
#     # result = client.your_method(param="value")
#     # assert result.return_value == expected_value
#
#     # Example: Check state changes
#     # global_state = client.get_global_state()
#     # assert global_state.get("some_key") == expected_value


# TODO: Test error conditions
# def test_method_with_invalid_input(client: YourContractClient) -> None:
#     """Test that invalid inputs are handled correctly."""
#     # Example: Test that invalid parameters raise expected errors
#     # with pytest.raises(Exception) as exc_info:
#     #     client.your_method(invalid_param="bad_value")
#     # assert "Expected error message" in str(exc_info.value)


# TODO: Test different user scenarios
# def test_method_with_different_user(
#     algod_client: AlgodClient,
#     client: YourContractClient
# ) -> None:
#     """Test contract behavior with different users."""
#     # Example: Create a different user account
#     # different_user = get_localnet_default_account(algod_client, account_index=1)
#
#     # Example: Call method as different user
#     # result = client.your_method(
#     #     param="value",
#     #     transaction_parameters=TransactionParameters(sender=different_user)
#     # )
#     # assert result.return_value == expected_value


# TODO: Test transaction parameters
# def test_method_with_transaction_params(client: YourContractClient) -> None:
#     """Test contract method with specific transaction parameters."""
#     # Example: Test with specific fees, notes, etc.
#     # result = client.your_method(
#     #     param="value",
#     #     transaction_parameters=TransactionParameters(
#     #         note="Test transaction",
#     #         suggested_params_timeout=10
#     #     )
#     # )
#     # assert result.return_value == expected_value
