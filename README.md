#wct-teamcity-reporter

###WCT plugin to enable test reporting in TeamCity.

Uses TeamCity Service messages described in [TeamCity Documentation](https://confluence.jetbrains.com/display/TCD8/Build+Script+Interaction+with+TeamCity#BuildScriptInteractionwithTeamCity-ReportingTests)

The plugin produces messages for __testStarted, testFinished, testFailed and testIgnored__ events.

The test names used are formatted as _suite.testname.browserName+browserVersion_.
For example _test_suite.passing.chrome40_

##Installing


```npm install wct-teamcity-reporter ```

After installation, run wct with the plugin enabled: ```wct --plugin teamcity-reporter```

or you can also enable it in your ```wct.conf.js```

```
module.exports = {
  plugins: {
    local: {
      browsers: ['chrome']
    },
    sauce: false,
    'teamcity-reporter': true
  }
};
```

##Testing

You can test the plugin manually by running tests for ```test/index.html``` with ```wct```

Before that you need to install ```webcomponentsjs``` with ```bower install webcomponentjs```

Then, install the local version of the plugin with
```
npm pack
npm install wct-teamcity-reporter-1.0.0.tgz
```

And then run the tests with ```wct```

Running tests will produce an output like this:
```
Starting Selenium server for local browsers
Selenium server running on port 54761
Web server running on port 54767 and serving from /Users/Saulis/Dev
chrome 40                Beginning tests via http://localhost:54767/wct-teamcity-reporter/test/index.html?cli_browser_id=0
##teamcity[testStarted name='test_suite.passing.chrome40']
##teamcity[testFinished name='test_suite.passing.chrome40' duration='0']
##teamcity[testStarted name='test_suite.failing.chrome40']
chrome 40                ✖ index.html » test suite » failing

  assert.fail()
    <unknown> at   Context.<anonymous> at /wct-teamcity-reporter/test/index.html:17:0

##teamcity[testFailed name='test_suite.failing.chrome40' message='assert.fail()' details='assert.fail()|n  Context.<anonymous> at /wct-teamcity-reporter/test/index.html:17']
##teamcity[testFinished name='test_suite.failing.chrome40' duration='0']
##teamcity[testIgnored name='test_suite.ignored.chrome40']
chrome 40                Tests failed: 1 failed tests
Test run ended in failure: 1 failed tests

chrome 40 (1/1/1)


1 failed tests
```
