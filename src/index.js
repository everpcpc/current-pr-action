/**
 * Get Current Pull Request
 */

const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');

const token = core.getInput('token');
const octokit = new Octokit({ auth: `token ${token}` });
const context = github.context;


async function run() {
    try {
        // const owner = context.repo.owner;
        // const repo = context.repo.repo;
        const ref = context.ref
        core.setOutput('url', ref);
    } catch (error) {
        core.setFailed(error.message);
    }
}
run()
