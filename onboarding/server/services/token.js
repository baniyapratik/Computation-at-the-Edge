var crypto = require('crypto');

module.exports = {
  create_api_key_sha256: function(user) {
    var timestamp = String(Date.now());
    var payload = user + timestamp;
    var crypto = require('crypto'),
      text = 'I love cupcakes',
      key = 'abcdeg',
      hash;

    api_key = crypto
      .createHmac('sha1', key)
      .update(text)
      .digest('hex');
    return api_key;
  }
};
