#!/usr/bin/env bash

VERSION=$(git rev-list --count HEAD)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]
then
  VERSION=$(echo "$BRANCH" | sed -e 's/\//-/g')-$VERSION
fi
yq e -i ".appVersion = \"$VERSION\"" infrastructure/pandachain-miniapp-be/Chart.yaml
yq e -i ".image.tag = \"$VERSION\"" infrastructure/pandachain-miniapp-be/values.yaml

echo "::set-output name=VERSION::$VERSION"
echo "::notice::Docker tag: $VERSION"
echo "Version: $VERSION"
