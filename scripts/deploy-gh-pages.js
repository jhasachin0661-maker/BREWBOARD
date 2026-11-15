import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function run(cmd) {
  console.log(`> ${cmd}`);
  return execSync(cmd, { stdio: 'inherit' });
}

try {
  console.log('1. Building production bundle...');
  run('npm run build');

  const currentBranch = execSync('git branch --show-current').toString().trim();
  console.log(`Current branch: ${currentBranch}`);

  // Push dist directly to gh-pages branch using git worktree or temporary tree object
  console.log('2. Preparing gh-pages tree...');
  const treeSha = execSync('git rev-parse HEAD').toString().trim();

  // Create a commit pointing to dist folder contents
  // We use git commit-tree or subtree
  console.log('3. Pushing dist to origin/gh-pages...');
  
  // Make sure git tracks dist temporarily or write a tree from dist
  run('git add -f dist');
  const distCommit = execSync('git write-tree --prefix=dist').toString().trim();
  const newCommit = execSync(`git commit-tree ${distCommit} -p ${treeSha} -m "Deploy to gh-pages"`).toString().trim();
  
  console.log(`Created commit ${newCommit} for dist.`);
  run(`git update-ref refs/heads/gh-pages ${newCommit}`);
  run('git push -f origin gh-pages');
  run('git reset HEAD dist');

  console.log('\nSUCCESS! gh-pages branch has been pushed to GitHub!');
} catch (err) {
  console.error('Deploy error:', err);
  process.exit(1);
}
