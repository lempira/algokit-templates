# ADR-001: AlgoKit Project Generator Architecture - Transition to Modular Generator System

## Status
Proposed

## Background Context

### Current System Overview
The AlgoKit ecosystem currently consists of two main repositories working in tandem. The algokit-templates repository uses Copier as its templating engine, organizing templates into base templates (workspace, contracts, frontend) and example templates that demonstrate specific use cases. Project composition is managed through an `examples.yml` configuration file that defines how templates are layered together. The algokit-cli repository provides the user interface through `algokit init` for project creation and `algokit generate` for adding components to existing projects. The system supports various features including preset configurations (starter vs production), post-generation hooks for configuration merging, IDE integration for VSCode and JetBrains, and maintains a curated list of "blessed" templates. The examples folder contains fully hydrated projects that serve dual purposes: providing reference implementations and populating the AlgoKit example gallery.

### User Workflows Requirements

**Workflow 1: Interactive TUI Wizard**
As a developer new to Algorand, I want to use an interactive wizard that guides me through project creation, so that I can easily select the features I need without understanding all the technical details upfront. The wizard should present me with clear options for project type, language preferences, and additional features like testing frameworks, linting tools, and IDE configurations. After creating my initial project, I should be able to run commands like `algokit project add testing` or `algokit project add linting` to incrementally enhance my project with new capabilities.

**Workflow 2: Incremental Command-Line Building**
As an experienced developer, I want to build my project incrementally using explicit commands, so that I have full control over the project structure and can automate the process in CI/CD pipelines. I should be able to start with `algokit project add workspace` to create a workspace structure, then add components like `algokit project add base --contracts --python` for smart contracts and `algokit project add base --frontend --react` for the frontend. This approach allows me to build exactly what I need, when I need it, and understand each layer being added to my project.

Example commands:
```bash
# Creates workspace structure
algokit project add workspace

# Adds Python contract base
algokit project add base --contracts --python

# Adds React frontend base
algokit project add base --frontend --react

# Auto-detects project type and adds testing
algokit project add testing

# Adds linting configuration
algokit project add linting
```

**Workflow 3: Configuration-Based Generation**
As a team lead or architect, I want to define my project structure in a configuration file and generate consistent projects from it, so that my team can quickly spin up standardized projects that follow our architectural patterns. I should be able to create a YAML configuration that specifies all the generators to apply in sequence, including base templates, example code, and features. This configuration should be versionable, shareable, and reproducible across different environments, enabling commands like `algokit project generate --config my-template.yml`.

### Project Generator Requirements

#### 1. Core Capabilities
- **Configuration-Based Generation**: Project generation SHALL run from a configuration and SHALL have all agreed-upon features that currently exist in the templates (e.g. use_python_pytest, use_jest, use_vitest, use_playwright etc.)
- **Feature Modularity and Idempotency**: Project generation features (e.g. testing, formatting, linting) SHALL be modular and idempotent. Features SHALL be able to be run (or added) at any point in the lifecycle of the project. Each feature SHALL be able to be run on top of any existing project in an idempotent way. Note: The order in which features are added does matter
- **Lifecycle Flexibility**: Features SHALL be addable at any point in the project lifecycle
- **Project Structure Support**: The project generator SHALL support users creating projects in a VSCode workspace or a non-workspace project structure

#### 2. User Interaction
- **Project Creation Methods**: Users SHALL be able to manually form a project from scratch by adding project features manually, specifying a configuration, or using an init wizard
- **Feature Addition Workflow with Diff Preview**: When adding a feature to a project, the project generator SHALL show the user the diff of what will be added. User approval SHALL be required before proceeding (similar to astro add functionality)
- **Conflict Detection and Resolution**: When adding a feature, the project generator SHALL check if the feature has already been added (either by configuration or existence of files/directories). The project generator SHALL warn the user that files will be overwritten if they proceed with feature generation

#### 3. Project Management
- **Feature Status Tracking**: While in an AlgoKit project, users SHALL be able to determine status of what features have been added to the project
- **Version Tracking**: The project generator SHALL be able to know what version of the project generator was used to generate the project
- **Compatibility Management**: The project generator SHALL be able to know if there are compatibility issues between the project generator used to generate the project and the project generator being used to add a feature. The project generator SHALL flag the user to these compatibility issues or error if the compatibility issues are not reconcilable

#### 4. Non Functional Requirements
- **No Manual Dependency Installation**: The project generator SHALL NOT require a user to manually install a python dependency or any other required dependencies in order to run the project generator

### Current Gaps

**Diff Preview and Approval System**
The current implementation applies changes directly without showing users what will be modified. There is no mechanism to preview changes before they are applied, and no approval workflow exists. This makes users hesitant to run generators on existing projects as they cannot predict the impact.

**Intelligent Conflict Detection**
While Copier provides basic file overwrite warnings, there is no intelligent detection of feature conflicts. The system cannot determine if a feature has already been added by examining project configuration or file patterns. This can lead to duplicate configurations or broken setups when features are added multiple times.

**Comprehensive Compatibility Management**
The current system has basic version requirement checking but lacks a compatibility matrix between generator versions. There are no automated migration paths when upgrading generators, and no clear way to handle breaking changes between versions. Projects can become stuck on old generator versions with no upgrade path.

**Self-Contained Execution Environment**
Users must manually install Python and other dependencies before using AlgoKit. The typed client generators require separate package installations (`@algorandfoundation/algokit-client-generator` for TypeScript, `algokit-client-generator` for Python). This creates barriers to entry and potential version conflicts.

**Scattered Feature Status Tracking**
Feature configuration is distributed across multiple files (`.copier-answers.yml`, `.algokit.toml`, `pyproject.toml`, `package.json`). There is no single command to view all enabled features and their status. Users must manually inspect multiple files to understand their project configuration.

## Options

### Option 1: Flat Generator Architecture with State in .algokit.toml

#### Overview
Transform the current template system into a flat generator architecture where every feature (workspace setup, base templates, testing, linting, etc.) is implemented as an independent, composable generator. State management is centralized in the project's `.algokit.toml` file, providing transparency and version control friendliness.

#### Functionality Distribution

| Functionality | CLI Repo | Templates Repo | Notes |
|--------------|----------|----------------|-------|
| TUI Wizard Interface | ✓ | | Interactive UI for project initialization |
| CLI Command Parsing | ✓ | | Parse and validate user commands |
| Generator Discovery | ✓ | | Query available generators from templates |
| Generator Metadata | | ✓ | Dependencies, compatibility, descriptions |
| Generator Implementation | | ✓ | All copier templates and transformation logic |
| Workflow Orchestration | ✓ | | Sequential application of generators |
| State Management | ✓ | | Track applied generators in .algokit.toml |
| Project Type Detection | ✓ | | Analyze existing project structure |
| Configuration Parsing | ✓ | | Parse YAML/TOML configuration files |
| Compatibility Checking | ✓ | | Validate generator combinations |
| Example Configurations | | ✓ | YAML files defining example projects |
| Hydrated Examples | | ✓ | Full example projects for app gallery |
| Diff Preview Engine | ✓ | | Show changes before applying |
| Conflict Resolution | ✓ | | Handle file conflicts during generation |
| Version Management | ✓ | | Track generator versions in .algokit.toml |

#### Repository Structure

**Templates Repository:**
```
algokit-templates/
├── generators/                           # All generators (flat structure)
│   ├── workspace/                       # Creates workspace structure
│   ├── base-contracts-python/           # Python contract base
│   ├── base-contracts-typescript/       # TypeScript contract base
│   ├── base-frontend-react/             # React frontend base
│   ├── create-smart-contract/           # Create new smart contract
│   ├── testing/                         # Add testing (auto-detects type)
│   ├── linting/                         # Add linting configuration
│   ├── formatting/                      # Add code formatting
│   ├── devcontainer/                    # Add devcontainer support
│   ├── ci-cd/                           # Add CI/CD workflows
│   ├── env-file/                        # Create environment files
│   ├── example-digital-marketplace/     # Digital marketplace delta
│   └── example-hello-world/             # Hello world delta
├── examples/                            # Fully hydrated examples
│   ├── examples.yml                     # Configuration for generating examples
│   ├── python-smart-contract/           # Complete project for app gallery
│   └── digital-marketplace/             # Complete project for app gallery
└── scripts/
    └── generate-examples.py             # Build examples from configurations
```

**CLI Repository:**
```
algokit-cli/
└── src/
    └── algokit/
        ├── cli/
        │   ├── project/
        │   │   ├── __init__.py
        │   │   ├── init.py              # TUI wizard implementation
        │   │   ├── add.py               # Incremental commands
        │   │   └── generate.py          # Configuration-based generation
        │   └── ...
        └── core/
            ├── project/
            │   ├── __init__.py
            │   ├── generator_registry.py # Discover available generators
            │   ├── state_manager.py      # Manage state in .algokit.toml
            │   ├── layer_engine.py       # Apply generators sequentially
            │   └── compatibility.py      # Check generator compatibility
            └── ...
```

#### State Management Example
```toml
[algokit]
min_version = "v2.0.0"

[project]
type = "workspace"
name = "my-project"
version = "0.1.0"
projects_root_path = "projects"

# Track applied generators with metadata
[project.generators]
workspace = { version = "1.0.0", timestamp = "2024-01-01T00:00:00Z" }
"base-contracts-python" = { version = "1.0.0", timestamp = "2024-01-01T00:01:00Z" }
testing = { version = "1.0.0", timestamp = "2024-01-01T00:02:00Z", detected_type = "python_contract" }

# Commands added by generators
[project.run]
test = { commands = ["poetry run pytest"], description = "Run smart contract tests" }
lint = { commands = ["poetry run ruff check"], description = "Check code style" }

# This is no longer need because it will be done with algokit project add
# [generate.devcontainer]
# description = "Generate a default 'devcontainer.json' configuration"
# path = ".algokit/generators/devcontainer"
```

#### Workflow Implementation

**Workflow 1: Interactive Wizard (TUI)**
There is a spike for this TUI [here](https://github.com/lempira/template-gallery-spike) Look at the end for a video of the TUI. 

```
CLI Repo                          Templates Repo
--------                          --------------
TUI Wizard -----------------> Query generators/*/copier.yaml
    |                              |
Present feature choices            v
    |                         Return generator metadata
    v                              |
User selects features              |
    |                              |
Validate selections <--------------+
    |
Apply generators sequentially --> Execute each generator
    |                              |
Update .algokit.toml               v
    |                         Apply template files
    v
Complete project
```

**Workflow 2: Incremental CLI Commands**

Command to Generator Mapping:

| Command | Generator Name |
|---------|---------------|
| `add workspace` | `workspace` |
| `add base --contracts --python` | `base-contracts-python` |
| `add base --contracts --typescript` | `base-contracts-typescript` |
| `add base --frontend --react` | `base-frontend-react` |
| `add testing` | `testing` |
| `add linting` | `linting` |
| `add formatting` | `formatting` |

**Workflow 3: Configuration-Based Generation**
```yaml
project:
  id: python-fullstack-marketplace
  name: "Digital Marketplace"
  # Additional metadata that can be used for any purpose e.g. example gallery
  
  # Generators applied in order
  # This is the only config that is needed to build a project
  # Each generator can run no data because of defaults but can be overridden with the data config.    
  generators:
    - name: workspace
      
    - name: base-contracts-python
      
    - name: create-smart-contract
      data:
        language: python
        contract_name: digital_marketplace
        
    - name: example-digital-marketplace
      
    - name: base-frontend-react
      
    - name: testing
      
    - name: linting
      
    - name: formatting
      
    - name: devcontainer
```

#### How This Satisfies Requirements

| Requirement Category | Requirement | How Option 1 Satisfies |
|---------------------|-------------|------------------------|
| **Core Capabilities** | Configuration-Based Generation | YAML configurations specify generators to apply sequentially |
| | Feature Modularity | Each feature is an independent generator in flat structure |
| | Idempotency | Generators designed to merge configurations, not overwrite |
| | Lifecycle Flexibility | Generators can be applied at any time via CLI commands |
| | Project Structure Support | Separate workspace and non-workspace generators |
| **User Interaction** | Multiple Creation Methods | TUI wizard, CLI commands, and config files all supported |
| | Diff Preview | CLI implements diff engine before applying generators |
| | Conflict Detection | CLI checks existing files and .algokit.toml state |
| **Project Management** | Feature Status Tracking | All features tracked in [project.generators] section |
| | Version Tracking | Each generator entry includes version and timestamp |
| | Compatibility Management | CLI validates versions before applying generators |
| **Non-Functional** | No Manual Dependencies | CLI bundles all required dependencies |

## Decision
[To be filled after review and discussion]

## Next Steps
[To be completed after decision]