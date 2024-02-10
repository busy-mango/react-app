#! /usr/bin/env ts-node

import { getUserAgentRegex } from 'browserslist-useragent-regexp';
import { writeFileSync } from 'fs';

try {
  writeFileSync(
    'src/caniuse.tsx',
    `/** caniuse-regexp */\n\nexport const caniuse =\n  ${getUserAgentRegex({
      ignoreMinor: true,
      ignorePatch: true,
      allowHigherVersions: true,
      allowZeroSubversions: true,
      ignoreUnknownVersions: true,
    })};\n`,
    { encoding: 'utf-8' }
  );

  console.info('Generated caniuse successfully');
} catch (error) {
  if (error instanceof Error) {
    console.error('Generated caniuse error: ' + error.message);
  } else console.error(error);
}
