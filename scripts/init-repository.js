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

    console.log('Creating organization...');
    try {
      await octokit.orgs.create({
        name: 'xScannerSOL',
        company: 'xScanner',
        description: 'Social Media Intelligence Platform'
      });
      console.log('Organization created successfully');
    } catch (e) {
      console.log('Organization already exists or creation failed, proceeding with repository...');
    }

    console.log('Creating repository under organization...');
    await octokit.repos.createInOrg({
      org: 'xScannerSOL',
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
      'git remote remove origin || true', // Remove existing remote if it exists
      'git init',
      'git add .',
      'git commit -m "Initial commit: xScanner Social Media Intelligence Platform"',
      'git branch -M main',
      'git remote add origin https://github.com/xScannerSOL/xScanner.git',
      'git push -u origin main --force' // Force push to overwrite any existing content
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