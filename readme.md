# Preamp docs

Repository which will hold documentation to not get lost while developing too ambitious project.

## Toolstack

- python 3.09 - 3.11 <- higher version for doorstop-edit won't work!
- python venv
- doorstop
- doorstop-edit
- mkdocs
- bootswatch theme for mkdocs


## Setup environment

1. Install python
2. Enable venv:
    - cd ./
    - python -m venv .venv
    - sh: .venv\Scripts\Activate.ps1 (@ Windows)(might need to Set-ExecutionPolicy)
    - python pip install -r .install_venv
**Note**: Don't close this terminal, because you are in the venv env.

## Generate docs doorstop

1. Run terminal (any)
2. Make sure your're in .venv
3. > doorstop publish --html --template preamp all ./out/
4. Open ./out/index.html

## Generate docs mkdocs
1. Run terminal (any)
2. Make sure you're in .venv
3. > doorstop publish --markdown all ./mkdocs/docs/generated/doorstop
4. > mkdocs serve
5. open link given by output from terminal (127.0.0.1:8000)
