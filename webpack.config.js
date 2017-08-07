var path = require('path');
var webpack = require('webpack');
var packageJSON = require('./package.json');
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;

var config  = {
    entry: './example/todo/main.js',
    output: {
        // path: __dirname,
        path: './example/todo/',
        filename: 'bundler.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                query: {
                    presets: 'env',
                    plugins : [
                       "babel-plugin-transform-es3-property-literals" ,
                        "babel-plugin-transform-es3-member-expression-literals"

                    ]
                }
            },{
                loader: 'virtual-dom-loader?jsx=Omi.x'
            }
        ],
        //rules: [
        //    {
        //        test: /\.js$/,
        //        exclude: /(node_modules|bower_components)/,
        //        use: [{
        //            loader: 'babel-loader',
        //            options: {
        //                presets: ['env']
        //            }
        //        },{
        //            loader: 'virtual-dom-loader?jsx=Omix.h'
        //        }]
        //    }
        //]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoEmitOnErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    // devtool: 'source-map',
};

if(ENV === 'build'||ENV === 'build-min'){
    config = {
        entry: {
            'omix': './src/index.js'
        },
        output: {
            // path: __dirname,
            path: path.resolve(__dirname,'./dist/'),
            library:'Omix',
            libraryTarget: 'umd',
            filename:  '[name].js'
            //umdNamedDefine: true
        },
        module: {
            loaders: [
                {
                    loader: 'babel-loader',
                    test: path.join(__dirname, 'src'),
                    query: {
                        presets: 'env',
                        plugins : [
                            "transform-es3-property-literals",
                            "transform-es3-member-expression-literals"
                        ]
                    },
                }
            ]
        },
        plugins: [
            // Avoid publishing files when compilation fails
            new webpack.BannerPlugin(" omix v"+packageJSON.version+" By dntzhang \r\n Github: https://github.com/AlloyTeam/omix\r\n MIT Licensed."),
            new webpack.NoEmitOnErrorsPlugin()
        ],
        stats: {
            // Nice colored output
            colors: true
        },
        // Create Sourcemaps for the bundle
       // devtool: 'source-map',
    };

     if(ENV === 'build-min'){
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8 : false
            },
            mangle: {
                screw_ie8: false
            },
            output: { screw_ie8: false }
        }));
        config.entry = {
            'omix.min': './src/index.js'
        };
    }
}else if(ENV==='todomvc'){
    config.entry = './' + ENV + '/js/main.js';
    config.output.path = './' + ENV + '/';
}else{
    config.entry = path.resolve(__dirname,'./example/' + ENV + '/main.js');
    config.output.path = path.resolve(__dirname,'./example/' + ENV + '/');
}


//console.log(ENV);

module.exports = config;
