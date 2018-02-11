require('ts-node').register();

module.exports.config = {
    specs: ['spec_wait.ts'],
//    directConnect: true,
    capabilities: {
        browserName: 'chrome',
        enableVNC: true,
        name: "YOUR NAME HERE" // Just to identify your session between others on selenoid ui
    },

    baseUrl: 'https://movies-finder.firebaseapp.com/',
    SELENIUM_PROMISE_MANAGER: false,
    onPrepare: function() {
        var ConsoleReporter = require('jasmine2-reporter').Jasmine2Reporter
        var console_reporter_options = {
            startingSpec: true
        }
        jasmine.getEnv().addReporter(new ConsoleReporter(console_reporter_options))
    }
}