const path = require("path");
const fs = require("fs");

const DefinePlugin = require("webpack").DefinePlugin;
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackDeployPlugin = require("html-webpack-deploy-plugin");

const main = (args) => {
	const plugins = () => {
		const definePlugin = new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(args.mode),
		});
		const copyPlugin = new CopyPlugin({
			patterns: [
				{
					noErrorOnMissing: true,
					from: path.join(__dirname, "source", "main", "assets"), to: path.join(__dirname, "output", "assets")
				}
			]
		});
		
		return [definePlugin, copyPlugin];
	};
	
	return {
		target: "electron-main",
		devtool: args.mode === "development" ? "source-map" : false,
		context: path.join(__dirname, "source"),
		entry: {
			"main": "./index.ts"
		},
		output: {
			filename: "[name].js",
			path: path.join(__dirname, "output")
		},
		resolve: {
			extensions: [".ts", ".js", ".json"],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: "esbuild-loader",
					options: {
						loader: "ts",
						target: "es2015"
					}
				},
			],
		},
		plugins: plugins(),
		externalsPresets: {node: true},
		externals: [nodeExternals()]
	};
};
const render = (args) => {
	const htmlWebpackDeployPlugin = new HtmlWebpackDeployPlugin({
		packages: {
			'react': {
				copy: [{from: 'umd', to: ''}],
				scripts: {
					variableName: 'React',
					path: 'react.production.min.js',
					cdnPath: 'umd/react.production.min.js',
				}
			},
			'react-dom': {
				copy: [{from: 'umd', to: ''}],
				scripts: {
					variableName: 'ReactDOM',
					path: 'react-dom.production.min.js',
					cdnPath: 'umd/react-dom.production.min.js',
				},
				useCdn: false
			}
		},
	});
	const definePlugin = new DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify(args.mode),
	});
	const htmlWebpackPlugin = new HtmlWebpackPlugin({
		filename: "index.html",
		template: "index.html",
		cache: true,
		minify: {
			collapseWhitespace: true,
			removeComments: true,
		},
		chunksSortMode: "none"
	});
	
	return {
		target: "electron-renderer",
		context: path.join(__dirname, "public"),
		devtool: args.mode === "development" ? "source-map" : false,
		entry: {
			"render": "./index.tsx",
		},
		output: {
			filename: "[name].js",
			path: path.join(__dirname, "output"),
			globalObject: 'this'
		},
		resolve: {
			extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"]
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'esbuild-loader',
					options: {
						loader: 'tsx'
					}
				},
				{
					test: /\.(scss|css|sass)$/,
					use: [
						"style-loader",
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.(woff|woff2|eot|ttf)$/,
					use: [
						{
							loader: "url-loader",
							options: {
								outputPath: "assets/fonts",
								limit: 100000
							}
						}
					],
				},
				{
					test: /\.(jpg|jpeg|png|gif|svg)$/,
					use: [
						{
							loader: "url-loader",
							options: {
								outputPath: "assets/img",
								limit: 100000
							}
						}
					],
				},
			],
		},
		devServer: {
			contentBase: path.join(__dirname, "public"),
			compress: true,
			hot: true,
			port: 3000,
			historyApiFallback: true,
		},
		externalsPresets: {node: true},
		plugins: [htmlWebpackPlugin, definePlugin, htmlWebpackDeployPlugin],
		externals: [nodeExternals()]
	};
};

module.exports = (env, args) => {
	if (env && env.target) {
		if (env.target === "main") return main(args);
		if (env.target === "render") return render(args);
	}
	
	return [main(args), render(args)];
};
