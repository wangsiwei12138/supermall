module.exports = {
	configureWebpack: {
		resolve: {
			extensions: [],
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views',
			}
		}
	},
	lintOnSave: false,
	devServer: {
		host: 'localhost',
		port: '8080',
		https: false,
		open: true,
		hotOnly: true
	}
}
