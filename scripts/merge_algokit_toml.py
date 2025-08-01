import tomli
import tomli_w
from pathlib import Path
import fire  # type: ignore[import-untyped]
from typing import Dict


def merge_algokit_toml_configs(
    source: Dict, destination: Dict, overwrite_existing_only: bool = False
) -> Dict:
    """
    Merge configurations from source into destination .algokit.toml.
    Focuses on merging project.run commands while preserving all other settings.

    Args:
        source: Source configuration dictionary
        destination: Destination configuration dictionary
        overwrite_existing_only: If True, only merge commands that already exist in destination
    """
    result = destination.copy()

    # Merge project.run commands
    if "project" in source and "run" in source["project"]:
        if "project" not in result:
            result["project"] = {}
        if "run" not in result["project"]:
            result["project"]["run"] = {}

        source_commands = source["project"]["run"]
        dest_commands = result["project"]["run"]

        for cmd_name, cmd_config in source_commands.items():
            if not overwrite_existing_only or cmd_name in dest_commands:
                dest_commands[cmd_name] = cmd_config

    # Merge other project settings (preserving existing)
    if "project" in source:
        if "project" not in result:
            result["project"] = {}

        for key, value in source["project"].items():
            if key != "run":  # run is handled separately above
                if not overwrite_existing_only or key in result["project"]:
                    result["project"][key] = value

    # Merge other top-level sections
    for section_name, section_data in source.items():
        if section_name != "project":
            if not overwrite_existing_only or section_name in result:
                result[section_name] = section_data

    return result


def merge_algokit_toml(
    source: str = ".", destination: str = ".", overwrite_existing_only: bool = False
) -> None:
    """
    Merge configurations from source .algokit.toml to destination .algokit.toml.

    Args:
        source: Path to source directory containing .algokit.toml
        destination: Path to destination directory containing .algokit.toml
        overwrite_existing_only: If True, only overwrite commands that already exist in destination
    """
    source_path = Path(source)
    dest_path = Path(destination)
    print(f"Merging .algokit.toml configurations from {source_path} to {dest_path}")

    # Ensure source exists and is a directory
    if not source_path.exists():
        raise ValueError(f"Source directory '{source}' does not exist")
    if not source_path.is_dir():
        raise ValueError(f"Source path '{source}' is not a directory")

    # Create destination if it doesn't exist
    dest_path.mkdir(parents=True, exist_ok=True)

    # Handle .algokit.toml
    source_algokit = source_path / ".algokit.toml"
    dest_algokit = dest_path / ".algokit.toml"

    if source_algokit.exists():
        with open(source_algokit, "rb") as f:
            source_config = tomli.load(f)

        if dest_algokit.exists():
            with open(dest_algokit, "rb") as f:
                dest_config = tomli.load(f)

            print(f"Merging configurations from {source_algokit} to {dest_algokit}")
            merged_config = merge_algokit_toml_configs(
                source_config, dest_config, overwrite_existing_only
            )
            dest_algokit.write_text(tomli_w.dumps(merged_config))
        else:
            if not overwrite_existing_only:
                print(f"Creating new .algokit.toml at {dest_algokit}")
                dest_algokit.write_text(tomli_w.dumps(source_config))
            else:
                print(
                    "Destination .algokit.toml doesn't exist and overwrite_existing_only is True. Skipping."
                )
    else:
        print(f"Source .algokit.toml not found at {source_algokit}")


if __name__ == "__main__":
    fire.Fire(merge_algokit_toml)
