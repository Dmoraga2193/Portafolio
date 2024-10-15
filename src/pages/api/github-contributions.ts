import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const username = "Dmoraga2193";
    const currentYear = new Date().getFullYear();
    const startOfYear = `${currentYear}-01-01T00:00:00Z`;

    const { data } = await octokit.rest.search.commits({
      q: `author:${username} author-date:>${startOfYear}`,
      per_page: 1,
    });

    res.status(200).json({ contributions: data.total_count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching GitHub contributions" });
  }
}
