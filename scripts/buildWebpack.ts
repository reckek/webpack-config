import { buildCache } from "./builds/cache";
import { buildDevServer } from "./builds/devServer";
import { buildLoaders } from "./builds/loaders";
import { buildPlugins } from "./builds/plugins";
import { buildResolvers } from "./builds/resolvers";
import type { BuildOptions } from "./types";
import type * as webpack from "webpack";

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths } = options;

  const isDev = mode === "development";

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    cache: buildCache(options),
    resolve: buildResolvers(options),
    devtool: isDev ? "eval-cheap-module-source-map" : false,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
};
