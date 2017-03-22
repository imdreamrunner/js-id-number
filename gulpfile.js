var gulp = require("gulp");
var ts = require("gulp-typescript");
var merge2 = require("merge2");
var amdclean = require("gulp-amdclean");
var webserver = require("gulp-webserver");

gulp.task("build-commonjs", function () {
    // Build CommonJS library.
    var tsProject = ts.createProject("tsconfig.json", {
        module: "commonjs"
    });
    var tsResult = tsProject.src().pipe(tsProject());
    return merge2([
        tsResult.js.pipe(gulp.dest("dist/commonjs")),
        tsResult.dts.pipe(gulp.dest("dist/commonjs"))
    ]);
});

gulp.task("build-amd", function () {
    // Build CommonJS library.
    var tsProject = ts.createProject("tsconfig.json", {
        module: "amd",
        outFile: "IDNumber.js"
    });
    var tsResult = tsProject.src().pipe(tsProject());
    return merge2([
        tsResult.js.pipe(gulp.dest("dist/amd")),
        tsResult.dts.pipe(gulp.dest("dist/amd"))
    ]);
});

gulp.task("build-plain", ["build-amd"], function () {
    // Build library for browser.
    return gulp
        .src(["dist/amd/IDNumber.js"])
        .pipe(amdclean.gulp({
            prefixMode: "standard",
            wrap: {
                // This string is prepended to the file
                start: ";(function(global) {\n",
                // This string is appended to the file
                end: "\nglobal.IDNumber=index.default;}(window));"
            }
        }))
        .pipe(gulp.dest("dist/browser"));
});

gulp.task("webserver", function() {
    gulp.src(".")
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task("build", ["build-commonjs", "build-plain"]);
gulp.task("default", ["build"]);
