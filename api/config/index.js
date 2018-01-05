var configValues = require('./config');

module.exports = {
    secret: 'thisIsASecretPhraseUsedForEncryption',
    getDbConnectionString: function() {
        return 'mongodb://' + 'test' + ':' + 'test' + '@ds117348.mlab.com:17348/holadb';
    }
}