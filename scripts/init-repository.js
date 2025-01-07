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

    console.log('Creating repository under your account...');
    try {
      await octokit.repos.createForAuthenticatedUser({
        name: 'xScanner',
        description: 'Social Media Intelligence Platform - Track and analyze digital presence',
        private: false,
        has_issues: true,
        has_projects: true,
        has_wiki: true,
        auto_init: true
      });
      console.log('Repository created successfully');
    } catch (e) {
      if (e.status === 422) {
        console.log('Repository already exists, proceeding with code push...');
      } else {
        throw e;
      }
    }

    // Initialize git and push code
    const commands = [
      'git remote remove origin || true',
      'git init',
      'git add .',
      'git commit -m "Initial commit: xScanner Social Media Intelligence Platform"',
      'git branch -M main',
      'git remote add origin https://github.com/xScannerSOL/xScanner.git',
      'git push -u origin main --force'
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