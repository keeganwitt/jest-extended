#!/usr/bin/env bash

set -o errexit -o pipefail -o nounset


function moveFiles() {
    dir="${1}"
    cd "${dir}"
    echo "Renaming files in ${PWD}"
    for file in *.js; do
        git mv "$file" "${file%.js}.ts"
    done
    cd - > /dev/null
}

moveFiles .
moveFiles src
moveFiles src/all
moveFiles src/matchers
moveFiles src/utils
moveFiles test/matchers
moveFiles test/utils
