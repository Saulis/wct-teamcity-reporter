function exists(object) {
  return typeof object !== 'undefined' && object !== null;
}

function getTestName(browser, test) {
  var suite = test.test[1];
  var testName = test.test[2];
  var browserIdentifier = exists(browser.deviceName)? browser.deviceName
      : exists(browser.platform)? browser.platform + '_' + browser.browserName
      : browser.browserName;

  if (exists(browser.version) && browser.version !== '') {
    browserIdentifier += '_' + browser.version;
  }

  return (suite + '.' + testName + '.' + browserIdentifier.replace(/\./g, '_')).replace(/ /g, '_');
};

var escapeMessage = function (message) {
  if(message === null || message === undefined) {
    return '';
  }

  return message.toString().
    replace(/\|/g, '||').
    replace(/\'/g, '|\'').
    replace(/\n/g, '|n').
    replace(/\r/g, '|r').
    replace(/\u0085/g, '|x').
    replace(/\u2028/g, '|l').
    replace(/\u2029/g, '|p').
    replace(/\[/g, '|[').
    replace(/\]/g, '|]');
};

module.exports = function(wct) {
  wct.on('test-start', function(browser, test) {

    console.log("##teamcity[testStarted name='"
      + getTestName(browser, test)
      + "']");

  }.bind(this));

  wct.on('test-end', function(browser, test) {
    if(test.state === 'pending') {

        console.log("##teamcity[testIgnored name='"
          + getTestName(browser, test)  + "']")

    } else {
      if(test.state === 'failing') {

        console.log("##teamcity[testFailed name='" + getTestName(browser, test)
          + "' message='" + escapeMessage(test.error.message)
          + "' details='" + escapeMessage(test.error.stack)
          + "']");

      }

      console.log("##teamcity[testFinished name='" + getTestName(browser, test)
        + "' duration='" + test.duration + "']");
    }
  }.bind(this));
};
