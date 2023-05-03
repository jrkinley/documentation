// Fetch the latest release version from GitHub
const { Octokit } = require("@octokit/rest");
const { retry } = require("@octokit/plugin-retry");
const OctokitWithRetries = Octokit.plugin(retry);
const owner = 'redpanda-data';
const repo = 'console';
const github = new OctokitWithRetries({
  userAgent: 'Redpanda Docs',
  baseUrl: 'https://api.github.com',
  auth: process.env.GITHUB_TOKEN
})

if (!process.env.GITHUB_TOKEN) return

var latestConsoleReleaseVersion;

async function getVersion () {
  await github.rest.repos.getLatestRelease({
      owner,
      repo,
  }).then((release => {
    const tag = release.data.tag_name
    latestConsoleReleaseVersion = tag.replace('v','')
  })).catch((error => {
    return
  }))
  console.log(latestConsoleReleaseVersion)
}

return getVersion()