/**
 * Get Current Pull Request
 */

const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');

const token = core.getInput('token');
const octokit = new Octokit({ auth: `token ${token}` });
const context = github.context;
const reREF = /^refs\/pull\/(\d+)\/merge$/;

async function run() {
    try {
        const match = context.ref.match(reREF);
        if (match === null) {
            core.setFailed("current ref is not pr");
            return
        }
        const prID = match[1];
        const pr = await octokit.pulls.get({
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: prID,
        })
        core.setOutput('url', pr.data.html_url);
        core.setOutput('number', prID);
        core.setOutput('title', pr.data.title);
        core.setOutput('author', pr.data.user.login);
    } catch (error) {
        core.setFailed(error.message);
    }
}
run()
