import os
import fire
import yaml
from pathlib import Path
from copier import run_copy
import json
from typing import Dict, Optional, Any
from update_workspace import update_workspace

BACKEND_TEMPLATES_NAME = "contracts"
FRONTEND_TEMPLATES_NAME = "frontend"


def load_examples_config() -> Dict[str, Any]:
    file_path = Path(__file__).parent.parent / "examples" / "examples.yml"
    with open(file_path, "r") as f:
        return yaml.safe_load(f)
    

def get_template_type(path: Path) -> Optional[str]:
    """
    Determine the template type based on the path.
    
    Args:
        path (Path): Path to the template
        
    Returns:
        str: Template type ('workspace', 'contracts', 'frontend', 'example')
    """
    template_type = "example"
    path_str = str(path)
    if path_str.startswith('templates/base/workspace'):
        template_type = 'workspace'
    elif path_str.startswith(f'templates/base/{BACKEND_TEMPLATES_NAME}'):
        template_type = BACKEND_TEMPLATES_NAME
    elif path_str.startswith(f'templates/base/{FRONTEND_TEMPLATES_NAME}'):
        template_type = FRONTEND_TEMPLATES_NAME
    return template_type


def read_workspace_config(workspace_file: Path) -> Dict[str, Optional[str]]:
    """
    Read the workspace file and extract configuration values.
    
    Args:
        workspace_file (Path): Path to the workspace file
        
    Returns:
        dict: Dictionary containing workspace configuration values
    """
    config = {
        'projects_root_path': None
    }
    
    if workspace_file and workspace_file.exists():
        with open(workspace_file, 'r') as f:
            workspace_data = json.loads(f.read())
            files_exclude = workspace_data.get('settings', {}).get('files.exclude', {})
            # Get the first key that ends with '/'
            projects_root_path = next((path for path in files_exclude.keys() if path.endswith('/')), None)
            if projects_root_path:
                config['projects_root_path'] = projects_root_path.rstrip('/')
    
    return config


def create_example(example: Dict[str, Any], bootstrap: bool = False) -> None:
    project_name = example["project_name"].lower().replace(" ", "-")
    # Create destination path based on example id
    base_destination_path = Path("examples") / example["id"]

    # Remove destination if it exists
    if base_destination_path.exists():
        import shutil
        shutil.rmtree(base_destination_path)
    
    # Apply each template in sequence
    for template in example["templates"]:
        source = Path(template["source"])
        template_type = get_template_type(source)
        workspace_file = next(base_destination_path.glob("*.code-workspace"), None)
        use_workspace = bool(workspace_file)
        
        
        template_data = template.get('data', {})
        template_data["use_workspace"] = use_workspace
        if not template_data.get("project_name"):
            template_data["project_name"] = project_name
        
        print(f"template: {template}")

        if use_workspace and template_type in [BACKEND_TEMPLATES_NAME, FRONTEND_TEMPLATES_NAME]:
            workspace_config = read_workspace_config(workspace_file)
            projects_root_path = workspace_config['projects_root_path']
            project_dir_name = f"{project_name}-{template_type}"
            template['destination'] = base_destination_path / projects_root_path / project_dir_name
            projects_path = os.path.join(projects_root_path, project_dir_name)
            # Update workspace file with the new project folder
            update_workspace(str(workspace_file), str(projects_path))
        
        template_destination = (
            Path(template["destination"])
            if "destination" in template
            else base_destination_path
        )
        # Create the parent directory if it doesn't exist
        template_destination.mkdir(parents=True, exist_ok=True)

        # Copy the template
        run_copy(
            src_path=str(source.absolute()),
            dst_path=str(template_destination.absolute()),
            data=template_data,
            unsafe=True,
            quiet=False,
            overwrite=True,
        )
    
    # Run bootstrap if flag is set
    if bootstrap:
        import subprocess
        print(f"Bootstrapping example: {example['id']}")
        subprocess.run(["algokit", "project", "bootstrap", "all"], cwd=base_destination_path, check=True)


def main(example_id: Optional[str] = None, bootstrap: bool = False) -> None:
    """
    Create examples from templates. If example_id is provided, only that example will be created.
    
    Args:
        example_id (str, optional): Specific example ID to process. If None, all examples will be processed.
        bootstrap (bool, optional): Whether to run 'algokit project bootstrap all' after creating the example. Defaults to False.
    """
    config = load_examples_config()

    if example_id:
        # Process single example
        example = next((ex for ex in config["examples"] if ex["id"] == example_id), None)
        if not example:
            print(f"No example found with ID: {example_id}")
            return
        print(f"\nProcessing example: {example['id']}")
        create_example(example, bootstrap)
        print(f"Completed: {example['id']}")
    else:
        # Process all examples
        for example in config["examples"]:
            print(f"\nProcessing example: {example['id']}")
            create_example(example, bootstrap)
            print(f"Completed: {example['id']}")


if __name__ == "__main__":
    fire.Fire(main)
