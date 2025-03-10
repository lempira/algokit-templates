import os
import fire
import yaml
from pathlib import Path
from copier import run_copy
import json
from update_workspace import update_workspace


def load_examples_config():
    file_path = Path(__file__).parent.parent / "examples" / "examples.yml"
    with open(file_path, "r") as f:
        return yaml.safe_load(f)


def read_workspace_config(workspace_file):
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


def create_example(example):
    project_name = example["project_name"].lower().replace(" ", "-")
    project_type = example["type"]
    # Create destination path based on example id
    base_destination_path = Path("examples") / example["id"]

    # Remove destination if it exists
    if base_destination_path.exists():
        import shutil
        shutil.rmtree(base_destination_path)
    
    # Apply each template in sequence
    for template in example["templates"]:
        source = Path(template["source"]).absolute()
        is_base_template = 'base-templates' in source.parts

        workspace_file = next(base_destination_path.glob("*.code-workspace"), None)
        use_workspace = bool(workspace_file)
        
        
        template_data = template.get('data', {})
        template_data["use_workspace"] = use_workspace
        if not template_data.get("project_name"):
            template_data["project_name"] = project_name
        
        print(f"template: {template}")

        if use_workspace:
            workspace_config = read_workspace_config(workspace_file)
            projects_root_path = workspace_config['projects_root_path']
            template['destination'] = base_destination_path / projects_root_path / f"{project_name}-{project_type}"
            projects_path = os.path.join(projects_root_path, f"{project_name}-{project_type}")
            # Update workspace file with the new project folder
            update_workspace(str(workspace_file), str(projects_path))
        
        template_destination = (
            Path(template["destination"])
            if "destination" in template
            else base_destination_path
        )
        print(f"{template} template_destination: {template_destination}, use_workspace: {use_workspace}, is_base_template: {is_base_template}")
        # Create the parent directory if it doesn't exist
        template_destination.mkdir(parents=True, exist_ok=True)

        # Copy the template
        run_copy(
            src_path=str(source),
            dst_path=str(template_destination.absolute()),
            data=template_data,
            unsafe=True,
            quiet=False,
            overwrite=True,
        )


def main(example_id=None):
    """
    Create examples from templates. If example_id is provided, only that example will be created.
    
    Args:
        example_id (str, optional): Specific example ID to process. If None, all examples will be processed.
    """
    config = load_examples_config()

    if example_id:
        # Process single example
        example = next((ex for ex in config["examples"] if ex["id"] == example_id), None)
        if not example:
            print(f"No example found with ID: {example_id}")
            return
        print(f"\nProcessing example: {example['id']}")
        create_example(example)
        print(f"Completed: {example['id']}")
    else:
        # Process all examples
        for example in config["examples"]:
            print(f"\nProcessing example: {example['id']}")
            create_example(example)
            print(f"Completed: {example['id']}")


if __name__ == "__main__":
    fire.Fire(main)
