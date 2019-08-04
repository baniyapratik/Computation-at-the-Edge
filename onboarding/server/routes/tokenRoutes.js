const tokenService = require('../services/token');
module.exports = app => {
  app.get('/', (req, res) => {
    var api_key = tokenService.create_api_key_sha256('user');
    console.log(api_key);
    res.send({ Hi: String(api_key) });
  });
};
