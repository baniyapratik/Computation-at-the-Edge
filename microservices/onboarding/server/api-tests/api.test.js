const request = require('supertest');
const app = require('../index').app;

describe('Onboarding', () => {
  it('POST /api/nodes', done => {
    let data = {
      name: 'newSOmething',
      dataPrivacy: 'Public',
      deviceType: 'web-cam',
      ipAddress: '1.2.3.5'
    };
    request(app)
      .post('/api/nodes')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });

  it('GET /api/nodes', done => {
    request(app)
      .get('/api/nodes')
      .expect(200)
      .end(done);
  });
});
