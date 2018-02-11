require('ts-node').register();

module.exports.config = {
    specs: ['spec.ts'],
    directConnect: true,
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