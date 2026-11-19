const pages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

export default {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  ...(pages ? { output: "export", trailingSlash: true } : {}),
};
