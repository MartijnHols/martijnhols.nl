export const repoName = process.env.PRISMIC_REPOSITORY!;
if (!repoName) {
  throw new Error("Missing required env var: PRISMIC_REPOSITORY");
}

// Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;
