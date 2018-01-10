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
    reporter: "mochawesome",
    timeout: "5000",
    reporterOptions: {
      reportFilename: 'mochaTestResultSummary',
      quiet: true
    }
  }))
    .pipe(istanbul.writeReports('coverage/summary'))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task("test-unit", ["pre-test"], function() {
  return gulp.src(["./test/unit/**/*.js"], {read: false})
    .pipe(mocha({
      reporter: "mochawesome",
      timeout: "5000",
      reporterOptions: {
        reportFilename: 'mochaUnitTestResult',
        quiet: true
      }
    }))
    .pipe(istanbul.writeReports('coverage/unit'))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 40 } }));
});

gulp.task("test-integration", ["pre-test"], function() {
  return gulp.src(["./test/integration/**/*.js"], {read: false})
    .pipe(mocha({
      reporter: "mochawesome",
      timeout: "5000",
      reporterOptions: {
        reportFilename: 'mochaIntegrationTestResult',
        quiet: true
      }
    }))
    .pipe(istanbul.writeReports('coverage/integration'))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 40 } }));
});
