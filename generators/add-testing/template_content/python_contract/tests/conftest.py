"""Pytest configuration and shared fixtures."""

import pytest
from algokit_utils import (
    Account,
    get_algod_client, 
    get_localnet_default_account,
)
from algokit_utils.config import config
from algosdk.v2client.algod import AlgodClient


@pytest.fixture(scope="session")
def algod_client() -> AlgodClient:
    """Get an Algod client for LocalNet."""
    return get_algod_client()


@pytest.fixture(scope="session")
def deployer(algod_client: AlgodClient) -> Account:
    """Get the default LocalNet deployer account."""
    return get_localnet_default_account(algod_client)


@pytest.fixture(autouse=True, scope="session")
def setup(algod_client: AlgodClient) -> None:
    """Setup test configuration."""
    config.configure(
        debug=True,
        # trace_all=True,
    ) 