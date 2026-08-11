import { execFileSync } from 'node:child_process';

const version = process.argv[2];

if (!version) {
  console.error('Usage: npm run prepare-release -- <version>');

  process.exit(1);
}

const versionPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/;

if (!versionPattern.test(version)) {
  console.error(`Invalid version: ${version}`);

  process.exit(1);
}

function run(command, args = []) {
  execFileSync(command, args, {
    stdio: 'inherit',
  });
}

function output(command, args = []) {
  return execFileSync(command, args, {
    encoding: 'utf8',
  }).trim();
}

const status = output('git', ['status', '--porcelain']);

if (status !== '') {
  console.error('Working tree is not clean.');

  process.exit(1);
}

const branch = output('git', ['branch', '--show-current']);

if (!branch) {
  console.error('Cannot prepare a release from detached HEAD.');

  process.exit(1);
}

if (branch === 'main') {
  console.error('Do not prepare a release directly on protected main.');

  process.exit(1);
}

console.log(`Preparing release v${version} on ${branch}...`);

run('npm', ['version', version, '--no-git-tag-version']);

run('git', ['add', 'package.json', 'package-lock.json']);

run('git', ['commit', '-m', `chore: release v${version}`]);

console.log('');
console.log(`Release v${version} prepared.`);

console.log('');
console.log(`Push ${branch}, merge the PR into main, then run:`);

console.log(`GitHub → Actions → Release package → Run workflow → ${version}`);
