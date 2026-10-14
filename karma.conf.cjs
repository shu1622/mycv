module.exports = function(config) {
 config.set({ frameworks: ['jasmine', '@angular-devkit/build-angular'], plugins: [require('karma-jasmine'), require('karma-chrome-launcher'), require('@angular-devkit/build-angular/plugins/karma')], reporters: ['progress'], browsers: ['ChromeHeadless'], customLaunchers: { ChromeHeadlessCI: { base: 'ChromeHeadless', flags: ['--no-sandbox','--disable-dev-shm-usage'] } }, singleRun: true });
};
