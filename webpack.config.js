const path = require("path");
const fs = require("fs");

const DefinePlugin = require("webpack").DefinePlugin;
const HtmlPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const main = (args) => {
	const definePlugin = new DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify(args.mode),
	});
	
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
		plugins: [definePlugin],
		externals: [nodeExternals()]
	};
};
const render = (args) => {
	const definePlugin = new DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify(args.mode),
	});
	const htmlPlugin = new HtmlPlugin({
		filename: "index.html",
		template: "index.html",
		cache: true,
		minify: {
			collapseWhitespace: true,
			removeComments: true,
		},
	});
	
	return {
		target: "electron-renderer",
		context: path.join(__dirname, "render"),
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
								limit: 100000,
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
			compress: true,
			hot: true,
			port: 3000,
			historyApiFallback: true,
		},
		plugins: [definePlugin, htmlPlugin],
	};
};

module.exports = (env, args) => {
	if (env && env.target) {
		if (env.target === "main") return main(args);
		if (env.target === "render") return render(args);
	}
	
	fs.rmSync(path.join(__dirname, "output"), {force: true, recursive: true});
	return [main(args), render(args)];
};
