define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'index',

        'greeting form': function () {
            return this.remote
                .get(require.toUrl('http://localhost/intern/index.html'))
                .setFindTimeout(5000)
                .findByCssSelector('body.loaded')
                .findById('nameField')
                    .clickElement()
                    .type('Elaine')
                    .end()
                .findByCssSelector('#loginForm input[type=submit]')
                    .clickElement()
                    .end()
                .findById('greeting')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, 'Hello, Elaine!',
                        'Greeting should be displayed when the form is submitted');
                });
        }
    });
});
