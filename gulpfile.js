var gulp = require("gulp"),
    mocha = require("gulp-mocha"),
    istanbul = require('gulp-istanbul');

// テストのカバレッジを取得するための準備
gulp.task('pre-test', function () {
  return gulp.src(['./app/*.js'])
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

// テスト
gulp.task("test", ["pre-test"], function() {
  return gulp.src(["./test/**/*.js"], {read: false})
  .pipe(mocha({
    reporter: "mocha-junit-reporter",
    reporterOptions: {
      mochaFile: './testResult/testResult-summary.xml'
    }
  }))
    .pipe(istanbul.writeReports(
      {
        dir: './coverage/summary',
        reporters: [ 'lcov', 'json', 'json-summary' ],
        reportOpts: {
          'json': {dir:'./coverage/summary/',file: 'coverage.json'},
          'json-summary': {dir:'./coverage/summary/',file: 'json-summary.json'}
        }
      }
    ))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task("test-unit", ["pre-test"], function() {
  return gulp.src(["./test/unit/**/*.js"], {read: false})
    .pipe(mocha({
      reporter: "mocha-junit-reporter",
      reporterOptions: {
        mochaFile: './testResult/testResult-unit.xml'
      }
    }))
    .pipe(istanbul.writeReports(
      {
        dir: './coverage/unit',
        reporters: [ 'lcov', 'json', 'json-summary' ],
        reportOpts: {
          'json': {dir:'./coverage/unit/',file: 'coverage.json'},
          'json-summary': {dir:'./coverage/unit/',file: 'json-summary.json'}
        }
      }
    ))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 40 } }));
});

gulp.task("test-integration", ["pre-test"], function() {
  return gulp.src(["./test/integration/**/*.js"], {read: false})
    .pipe(mocha({
      reporter: "mocha-junit-reporter",
      reporterOptions: {
        mochaFile: './testResult/testResult-integration.xml'
      }
    }))
    .pipe(istanbul.writeReports(
      {
        dir: './coverage/integration',
        reporters: [ 'lcov', 'json', 'json-summary' ],
        reportOpts: {
          'json': {dir:'./coverage/integration/',file: 'coverage.json'},
          'json-summary': {dir:'./coverage/integration/',file: 'json-summary.json'}
        }
      }
    ))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 40 } }));
});
