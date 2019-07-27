exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {
    WebDriver: {
      url: "http://react-app:3000",
      host: "react-firefox-container",
      browser: "firefox",
      smartWait: 5000,
      restart: false,
      waitForTimeout: 10000,
      timeouts: {
        script: 60000,
        "page load": 60000
      },
      coloredLogs: true,
      desiredCapabilities: {
        "moz:firefoxOptions": {
          // https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities/firefoxOptions
          args: ["-headless"],
          prefs: {
            "browser.display.use_focus_colors ": true
          }
        },
        acceptInsecureCerts: true
      }
    }
  },
  bootstrap: false,
  mocha: {},
  name: "codeceptjs-docker"
};
