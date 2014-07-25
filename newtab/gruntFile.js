module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-recess');
//    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-html2js');

    // Default task.
    grunt.registerTask('default', ['ngconstant:development', 'build']);//,'karma:unit','jshint',
    grunt.registerTask('build', ['clean', 'html2js', 'concat', 'recess:build', 'copy:assets', 'copy:i18n']);
    grunt.registerTask('release', ['clean', 'html2js', 'uglify', 'jshint', 'concat:index', 'recess:min', 'copy:assets']);//'karma:unit',
//    grunt.registerTask('test-watch', ['karma:watch']);
    grunt.registerTask('release', ['ngconstant:production', 'jshint', 'build', 'copy:release']);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function () {
        grunt.log.subhead(Date());
    });

    var karmaConfig = function (configFile, customOptions) {
        var options = { configFile: configFile, keepalive: true };
        var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
        return grunt.util._.extend(options, customOptions, travisOptions);
    };

    // Project configuration.
    grunt.initConfig({
        distdir: 'dist',
        srcDir: 'src',
        releasedir: '../../platform/android/assets/www/',
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
            ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        src: {
            js: ['src/config/pref.js','src/**/*.js', '<%= distdir %>/templates/**/*.js','!**/content/**','!**/background/**'],
//            appJs: ['src/common/**/*.js','src/resources/**/*.js','src/app/**/*.js'],
            contentJs: ['src/content/**/*.js'],
            backgroundJs: ['src/resources/idb.js','src/background/background.js'],
            specs: ['test/**/*.spec.js'],
            scenarios: ['test/**/*.scenario.js'],
            html: ['src/index.html'],
            i18n: ['_locales/**/*.json'],
            manifest: ['src/manifest.json'],
            tpl: {
                app: ['src/app/**/*.tpl.html'],
                common: ['src/common/**/*.tpl.html'],
                sidebar: ['src/sidebar/**/*.tpl.html'],
                plugin: ['src/plugin/**/*.tpl.html']
            },
            less: ['src/less/stylesheet.less'], // recess:build doesn't accept ** in its file patterns
            lessWatch: ['src/less/**/*.less']
        },
        ngconstant: {
            options: {
                space: '  '
            },
            development: {
                dest: '<%= srcDir %>/config/config.js',
                name: 'config',
                constants: {
                    API: {
                        HOST: 'http://ihome.com/api/'
                    },
                    ENV: 'development'
                }
            },
            production: [
                {
                    dest: '<%= srcDir %>/config/config.js',
                    name: 'config',
                    constants: {
                        API: {
                            HOST: 'http://api.czmin.com/api/'
                        },
                        ENV: 'production'
                    }
                }
            ]
        },
        clean: ['<%= distdir %>/*'],
        copy: {
            assets: {
                files: [
                    { dest: '<%= distdir %>/resource', src: '**', expand: true, cwd: 'src/assets/' }

                ]
            },
            i18n: {
                files: [
                    { dest: '<%= distdir %>/_locales', src: '**', expand: true, cwd: 'src/_locales/' }
                ]
            },
            release: {
                files: [
                    { dest: '<%= releasedir %>/resource', src: '**', expand: true, cwd: 'dist/' }
                ]
            }
        },
        karma: {
            unit: { options: karmaConfig('test/config/unit.js') },
            watch: { options: karmaConfig('test/config/unit.js', { singleRun: false, autoWatch: true}) }
        },
        html2js: {
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= src.tpl.app %>'],
                dest: '<%= distdir %>/templates/app.js',
                module: 'templates.app'
            },
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= src.tpl.common %>'],
                dest: '<%= distdir %>/templates/common.js',
                module: 'templates.common'
            }
        },
        concat: {
            dist: {
                options: {
                    banner: "<%= banner %>"
                },
                src: ['<%= src.js%>'],
                dest: '<%= distdir %>/<%= pkg.name %>.js'
            },
            contentJS: {
                src:['<%= src.contentJs%>'],
                dest: '<%= distdir %>/content/content.js',
                options: {
                    process: true
                }
            },
            contentCSS: {
                src: ['src/content/style.css'],
                dest: '<%= distdir %>/content/style.css',
                options: {
                    process: true
                }
            },
            background: {
                src: ['src/config/pref.js','<%= src.backgroundJs%>'],
                dest: '<%= distdir %>/background/background.js',
                options: {
                    process: true
                }
            },
            manifest: {
                src: ['src/manifest.json'],
                dest: '<%= distdir %>/manifest.json',
                options: {
                    process: true
                }
            },
            backgroundHtml: {
                src: ['src/background.html'],
                dest: '<%= distdir %>/background.html',
                options: {
                    process: true
                }
            },
            jquery: {
                src: ['vendor/jquery/jquery.js','vendor/jquery/jquery-ui.min.js'],
                dest: '<%= distdir %>/lib/jquery.js',
                options: {
                    process: true
                }
            },
            idbstore: {
                src: ['vendor/idbwrapper/idbstore.js'],
                dest: '<%= distdir %>/lib/idbstore.js',
                options: {
                    process: true
                }
            },
            index: {
                src: ['src/index.html'],
                dest: '<%= distdir %>/index.html',
                options: {
                    process: true
                }
            },
            angular: {
                src: ['vendor/angular/angular.js', 'vendor/angular/angular-route.js', 'vendor/angular/angular-resource.js', 'vendor/angular/angular-sanitize.js'],
                dest: '<%= distdir %>/angular.js'
            },
            plugin: {
                src: ['vendor/underscore/underscore-min.js', 'vendor/ng_modal/ng-modal.js','vendor/idbwrapper/idbstore.js','vendor/ui-sortable/src/sortable.js'],
                dest: '<%= distdir %>/plugin.js'
            }
//            jquery: {
//                src: ['vendor/jquery/*.js'],
//                dest: '<%= distdir %>/jquery.js'
//            },
        },
        uglify: {
            mangle: {toplevel: true},
            squeeze: {dead_code: true},
            codegen: {quote_keys: true},
            dist: {
                options: {
                    banner: "<%= banner %>"
                },
                src: ['<%= src.js%>'],
                dest: '<%= distdir %>/<%= pkg.name %>.js'
            },
            angular: {
                src: ['<%= concat.angular.src %>'],
                dest: '<%= distdir %>/angular.js'
            },
            jquery: {
                src: ['vendor/jquery/*.js'],
                dest: '<%= distdir %>/lib/jquery.js'
            }
        },
        recess: {
            build: {
                files: {
                    '<%= distdir %>/<%= pkg.name %>.css': ['<%= src.less %>'] },
                options: {
                    compile: true
                }
            },
            min: {
                files: {
                    '<%= distdir %>/<%= pkg.name %>.css': ['<%= src.less %>']
                },
                options: {
                    compress: true
                }
            }
        },
        watch: {
            all: {
//                files: ['<%= src.js%>', '<%= src.contentJs %>', '<%= src.backgroundJs %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.tpl.sidebar%>', '<%= src.tpl.plugin %>', '<%= src.html %>', '<%= src.manifest%>', '<%= src.i18n%>', '!**/config/config.js','**/content/**/*.js','**/background/**/*.js'],
                files: ['src/**/*.js','src/**/*.html','src/**/*.less','!**/config/config.js'],
                tasks: ['default', 'timestamp']
            },
            build: {
                files: ['<%= src.js%>', '<%= src.contentJs %>', '<%= src.backgroundJs %>','<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.tpl.sidebar %>', '<%= src.tpl.plugin %>', '<%= src.html %>', '<%= src.manifest%>', '<%= src.i18n%>', '!**/config/config.js','**/content/**','**/background/**'],
                tasks: ['build', 'timestamp']
            }
        },
        jshint: {
            files: ['gruntFile.js','<%= src.js%>', '<%= src.contentJs %>', '<%= src.backgroundJs %>','<%= src.specs %>', '<%= src.scenarios %>'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                globals: {}
            }
        }
    });

};
