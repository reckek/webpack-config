import type { BuildOptions } from "scripts/types";
import type { Configuration } from "webpack";

export const buildCache = ({
  mode,
  paths,
}: BuildOptions): Configuration["cache"] => {
  const isDev = mode === "development";
  const isProd = mode === "production";

  return {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: paths.cache,
    name: isDev ? "dev" : isProd ? "prod" : undefined,
    compression: isProd ? "gzip" : false,
    hashAlgorithm: "sha256",
    allowCollectingMemory: true,
    store: "pack",
  };
};
