import {Configuration as WebpackConfiguration, DefinePlugin} from "webpack";
import {Configuration as WebpackDevServerConfiguration} from "webpack-dev-server";

import {ESBuildMinifyPlugin} from "esbuild-loader";

import * as HtmlPlugin from "html-webpack-plugin";
import * as NodeExternals from "webpack-node-externals";
import * as path from "path";

import * as TerserPlugin from "terser-webpack-plugin";

interface Configuration extends WebpackConfiguration {
	devServer?: WebpackDevServerConfiguration;
}

const dist = path.join(__dirname, "dist");

const main = (args): Configuration => {
	console.log(`build for main with ${args.mode} mode`);

	const esBuildMinifyPlugin = new ESBuildMinifyPlugin();
	const definePlugin = new DefinePlugin({
		"process.env.mode": JSON.stringify(args.mode),
	});
	const nodeExternals = NodeExternals();
	const terserPlugin = new TerserPlugin({
		parallel: true,
	});

	return {
		context: path.join(__dirname, "main"),
		target: "electron-main",
		entry: {
			"main": "./source/index.ts"
		},
		output: {
			path: path.join(dist),
			asyncChunks: true
		},
		resolve: {
			extensions: [".ts", ".json"],
		},
		module: {
			rules: [
				{
					test: /\.ts?$/,
					loader: "esbuild-loader",
					options: {
						loader: "ts"
					}
				}
			],
		},
		optimization: {
			minimize: true,
			minimizer: [
				esBuildMinifyPlugin, terserPlugin
			]
		},
		plugins: [definePlugin],
		externals: [nodeExternals],
	};
};
const preload = (args): Configuration => {
	console.log(`build for preload with ${args.mode} mode`);

	const esBuildMinifyPlugin = new ESBuildMinifyPlugin();

	return {
		context: path.join(__dirname, "preload"),
		target: "electron-preload",
		entry: {
			"index": "./source/index.ts"
		},
		output: {
			path: path.join(dist, "preload"),
			asyncChunks: true,
			clean: true,
		},
		module: {
			rules: [
				{
					test: /\.ts?$/,
					loader: "esbuild-loader",
					options: {
						loader: "ts"
					}
				}
			],
		},
		optimization: {
			minimizer: [esBuildMinifyPlugin],
		},
	};
};
const renderer = (args): Configuration => {
	console.log(`build for renderer with ${args.mode} mode`);

	const htmlPlugin = new HtmlPlugin({
		template: "./public/index.html",
		cache: false,
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeRedundantAttributes: true,
			useShortDoctype: true,
			removeEmptyAttributes: true,
			removeStyleLinkTypeAttributes: true,
			keepClosingSlash: true,
			minifyJS: true,
			minifyCSS: true,
			minifyURLs: true
		}
	});
	const esBuildMinifyPlugin = new ESBuildMinifyPlugin();

	return {
		context: path.join(__dirname, "renderer"),
		target: "electron-renderer",
		entry: {
			"index": "./source/index.tsx"
		},
		output: {
			path: path.join(dist, "renderer"),
			asyncChunks: true,
			clean: true,
		},
		resolve: {
			extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss", ".ttf"]
		},
		module: {
			rules: [
				{
					test: /\.(tsx)$/i,
					loader: "esbuild-loader",
					options: {
						loader: "tsx"
					}
				},
				{
					test: /\.(scss)$/i,
					use: [
						"style-loader",
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.(jpg|jpeg|png|gif|svg)$/i,
					use: [
						{
							loader: "url-loader"
						}
					],
				},
			],
		},
		plugins: [htmlPlugin],
		optimization: {
			minimizer: [esBuildMinifyPlugin],
			splitChunks: {
				chunks: 'all',
			},
		},
		performance: {
			hints: false,
		},
		devServer: {
			compress: true,
			hot: true,
			port: 3000,
			historyApiFallback: true,
		},
	};
};

module.exports = (env, args) => {
	if (env && env.target) {
		if (env.target === "main") return main(args);
		if (env.target === "preload") return preload(args);
		if (env.target === "renderer") return renderer(args);
	}

	return [main(args), preload(args), renderer(args)];
};
