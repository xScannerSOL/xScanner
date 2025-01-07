#!/usr/bin/env node
import { Octokit } from '@octokit/rest';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function initRepository() {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    console.log('Creating repository...');
    await octokit.repos.createForAuthenticatedUser({
      name: 'xScanner',
      description: 'Social Media Intelligence Platform - Track and analyze digital presence',
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true
    });

    console.log('Repository created successfully');
    
    // Initialize git and push code
    const commands = [
      'git init',
      'git add .',
      'git commit -m "Initial commit: xScanner platform"',
      'git branch -M main',
      'git remote add origin https://github.com/xScannerSOL/xScanner.git',
      'git push -u origin main'
    ];

    for (const cmd of commands) {
      console.log(`Executing: ${cmd}`);
      await execAsync(cmd);
    }

    console.log('✅ Repository initialized and code pushed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

initRepository();
