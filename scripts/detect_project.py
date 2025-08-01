#!/usr/bin/env python3
"""Detect project type and return data for copier templates."""

import sys
from pathlib import Path
import tomli


def detect_project():
    """Detect project type and language from project files."""
    cwd = Path.cwd()

    # Initialize results
    project_type = "unknown"
    project_language = "unknown"
    contract_name = "hello_world"

    # Check .algokit.toml
    algokit_toml_path = cwd / ".algokit.toml"
    if algokit_toml_path.exists():
        try:
            with open(algokit_toml_path, "rb") as f:
                config = tomli.load(f)

            project_type = config.get("project", {}).get("type", "unknown")
        except Exception as e:
            print(f"Warning: Could not parse .algokit.toml: {e}", file=sys.stderr)

    # Detect language
    if (cwd / "pyproject.toml").exists():
        project_language = "python"

        # Try to detect contract name from Python files
        contracts_dir = cwd / "smart_contracts"
        if contracts_dir.exists():
            for item in contracts_dir.iterdir():
                if (
                    item.is_dir()
                    and not item.name.startswith("_")
                    and not item.name.startswith(".")
                ):
                    contract_file = item / "contract.py"
                    if contract_file.exists():
                        contract_name = item.name
                        break

    elif (cwd / "package.json").exists():
        project_language = "typescript"

        # Try to detect contract name from TypeScript files
        contracts_dir = cwd / "smart_contracts"
        if contracts_dir.exists():
            for item in contracts_dir.iterdir():
                if (
                    item.is_file()
                    and item.suffix == ".ts"
                    and item.name.endswith(".algo.ts")
                ):
                    contract_name = item.stem.replace(".algo", "")
                    break

    # Determine template type based on detection
    if project_type == "contract" and project_language == "python":
        template_type = "python_contract"
    elif project_type == "contract" and project_language == "typescript":
        template_type = "typescript_contract"
    elif project_type == "frontend" and project_language == "typescript":
        template_type = "typescript_frontend"
    else:
        template_type = "unknown"

    # Return detected data for use by generator
    detected_data = {
        "template_type": template_type,
        "contract_name": contract_name,
    }

    print(f"Detected: {template_type} template", file=sys.stderr)

    return detected_data


if __name__ == "__main__":
    detect_project()
