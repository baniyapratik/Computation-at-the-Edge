const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const tokenService = require('../services/token');

const Node = mongoose.model('nodes');

module.exports = app => {
  // POST Nodes
  app.post('/api/nodes', async (req, res) => {
    console.log(req.user);
    const { name, dataPrivacy, deviceType, ipAddress } = req.body;
    const node = new Node({
      name,
      dataPrivacy,
      deviceType,
      ipAddress,
      apiKey: tokenService.create_api_key_sha256('user')
      //_user: req.user.id
    });
    try {
      await node.save();
      console.log(node);
      res.status(201).send(node);
    } catch (err) {
      console.log(err);
      res.send(400, err);
    }
  });
  // GET Nodes
  app.get('/api/nodes', (req, res) => {
    const nodes = Node.find({}).exec(function(err, node) {
      console.log(node);
      res.status(200).send(node);
    });
  });

  // GET Node
  app.get('/api/nodes/:id', (req, res) => {
    const node_id = req.params.id;

    console.log(node_id);
    Node.findById(node_id).exec(function(err, node) {
      console.log(err);
      res.status(200).send(node);
    });
  });

  // DELETE Node
  app.delete('/api/nodes/:id', (req, res) => {
    const node_id = req.params.id;
    Node.find({ _id: node_id })
      .remove()
      .exec();

    res.status(200).send('Deleted');
  });

  // API Token
  app.get('/api/token', (req, res) => {
    var api_key = tokenService.create_api_key_sha256('user');
    console.log(api_key);
    res.send({ Hi: String(api_key) });
  });
};
