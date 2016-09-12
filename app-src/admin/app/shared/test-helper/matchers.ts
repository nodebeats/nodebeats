beforeEach(() => {
  jasmine.addMatchers({
    toHaveText: function() {
      return {
        compare: function(actual, expectedText) {
          var actualText = actual.textContent;
          return {
            pass: actualText == expectedText,
            get message() { return 'Expected ' + actualText.trim() + ' to equal ' + expectedText.trim(); }
          };
        }
      };
    },

    toContainText: function() {
      return {
        compare: function(actual, expectedText) {
          var actualText = actual.textContent;
          return {
            pass: actualText.indexOf(expectedText) > -1,
            get message() { return 'Expected ' + actualText + ' to contain ' + expectedText; }
          };
        }
      };
    }
  });
});
