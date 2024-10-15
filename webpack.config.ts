import path from "node:path";
import type webpack from "webpack";
import { buildWebpack } from "./scripts/buildWebpack";
import type { BuildMode, BuildPaths } from "./scripts/types";

interface EnvVariables {
  mode?: BuildMode;
  analyzer?: boolean;
  port?: number;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"),
    cache: path.resolve(__dirname, ".cache"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
  });

  return config;
};
