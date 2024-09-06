cd infrastructure || exit
helmfile -f "helmfile.yaml" apply
