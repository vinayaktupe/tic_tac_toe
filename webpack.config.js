const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	entry: ["babel-polyfill", "./app.js"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/bundle.js",
	},
	devServer: {
		contentBase: "./dist",
	},
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		filename: "index.html",
	// 		template: "./src/index.html",
	// 	}),
	// ],
	module: {
		rules: [
			{
				test: /\.js$/, //this is an regex that will look for all the js files in the project to convert it from ES6 to ES5
				exclude: /node_modules/, //this will exclude files in node_modules folder
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
};
