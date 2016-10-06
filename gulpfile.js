var gulp = require("gulp");
var ts = require("gulp-typescript");
var merge2 = require("merge2");
var amdclean = require("gulp-amdclean");
var webserver = require("gulp-webserver");

gulp.task("build", function () {
    var tsProject = ts.createProject("tsconfig.json", {
        module: "amd",
        outFile: "IDValidators.js"
    });
    var tsResult = tsProject.src().pipe(tsProject());
    return merge2([
        tsResult.js.pipe(gulp.dest("dist/amd")),
        tsResult.dts.pipe(gulp.dest("dist/amd"))
    ]);
});

gulp.task("build-plain", ["build"], function () {
    return gulp
        .src(["dist/amd/IDValidators.js"])
        .pipe(amdclean.gulp({
            prefixMode: "standard",
            wrap: {
                // This string is prepended to the file
                start: ";(function(global) {\n",
                // This string is appended to the file
                end: "\nglobal.IDValidators=IDValidators;}(window));"
            }
        }))
        .pipe(gulp.dest("dist/bin"));
});

gulp.task("webserver", function() {
    gulp.src(".")
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task("default", ["build", "build-plain"]);
