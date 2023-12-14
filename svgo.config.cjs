module.exports = {
    js2svg: {
        indent: 2, // number
        pretty: true // boolean
    },
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeViewBox: false,
                },
            },
        },
    ],
}