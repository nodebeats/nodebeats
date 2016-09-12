describe('Login e2e with DFA Enabled', function () {
    beforeEach(function () {
        browser.get('/login');
    });
    it('should have login Form', function () {
        var subject = element(by.css('h1')).isPresent();
        var result = true;
        expect(subject).toEqual(result);
        var loginForm = element(by.css('.login-title'));
        expect(loginForm.isPresent()).toBe(true);
        expect(loginForm.getText()).toEqual("Nodebeats Login");
    });
    it('should show required message when login with empty credential', function () {
        var form = element(by.css('form'));
        element(by.css('input[type="text"]')).sendKeys("");
        element(by.css('input[type="password"]')).sendKeys("");
        form.submit();
        var validationMsg = element(by.css('.error-msg')).isPresent();
        var msgElement = element(by.css('.auth-message')).getText();
        expect(validationMsg).toEqual(true);
        expect(msgElement).toBe("");
    });
    it('should show invalid credential message when login with wrong credential ', function () {
        var form = element(by.css('form'));
        element(by.css('input[type="text"]')).sendKeys("wronguser");
        element(by.css('input[type="password"]')).sendKeys("wrongpass");
        form.submit();
        var errorMsg = element(by.css('.auth-message')).getText();
        expect(errorMsg).toEqual('Invalid credentials');
        var validationMsg = element(by.css('.error-msg')).isPresent();
        expect(validationMsg).toEqual(false);
    });
    it('should show TFA form when right credential is provided', function () {
        var form = element(by.css('form'));
        element(by.css('input[type="text"]')).sendKeys("superadmin");
        element(by.css('input[type="password"]')).sendKeys("superadmin@123");
        form.submit();
        var errorMsg = element(by.css('.auth-message')).getText();
        expect(errorMsg).toEqual('');
        var validationMsg = element(by.css('.error-msg')).isPresent();
        expect(validationMsg).toBe(false);
        var tfaForm = element(by.css('.login-title'));
        expect(tfaForm.isPresent()).toBe(true);
        expect(tfaForm.getText()).toEqual("Nodebeats 2FA Login");
    });
    it('should show required field when no credential is provided', function () {
        var form = element(by.css('form'));
        element(by.css('input[type="text"]')).sendKeys("superadmin");
        element(by.css('input[type="password"]')).sendKeys("superadmin@123");
        form.submit();
        form = element(by.css('form'));
        element(by.css('input[type="text"]')).sendKeys("");
        form.submit();
        var errorMsg = element(by.css('.auth-message')).getText();
        expect(errorMsg).toEqual('');
        var validationMsg = element(by.css('.error-msg')).isPresent();
        expect(validationMsg).toBe(true);
    });
    it('should show required invalid token field when wrong token is provided', function () {
        var form = element(by.css('form'));
        element(by.css('input[type="text"]')).sendKeys("superadmin");
        element(by.css('input[type="password"]')).sendKeys("superadmin@123");
        form.submit();
        form = element(by.css('form'));
        element(by.css('input[type="text"]')).sendKeys("12234");
        form.submit();
        var errorMsg = element(by.css('.auth-message')).getText();
        expect(errorMsg).toEqual('TOTP Token not verified');
        var validationMsg = element(by.css('.error-msg')).isPresent();
        expect(validationMsg).toBe(false);
    });
    it('should successfully navigate to admin dashboard when valid token is provided', function () {
        var form = element(by.css('form'));
        element(by.css('input[type="text"]')).sendKeys("superadmin");
        element(by.css('input[type="password"]')).sendKeys("superadmin@123");
        form.submit();
        form = element(by.css('form'));
        element(by.css('input[type="text"]')).sendKeys("123234");
        form.submit();
        // let errorMsg = element(by.css('.auth-message')).getText();
        // expect(errorMsg).toEqual('');
        // let validationMsg = element(by.css('.error-msg')).isPresent();
        // expect(validationMsg).toBe(false);
        return browser.wait(function () {
            return browser.getCurrentUrl().then(function (url) {
                return /admin/.test(url);
            });
        }, 3000);
    });
});
//# sourceMappingURL=login.e2e.js.map