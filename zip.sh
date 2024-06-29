#!/bin/bash
alumne=rbuj
pac=pac3
fitxer="${pac}_${alumne}.zip"

if [ -f ${fitxer} ]; then
  rm -f ${fitxer}
fi

zip ${fitxer} -r .eslintrc.json .gitignore .prettierrc.json .vscode \
  LICENSE README.md PAC.md PEC.md public \
  package.json src
