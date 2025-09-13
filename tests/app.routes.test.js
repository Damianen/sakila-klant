import request from 'supertest';
import app from '../src/app.js';

describe('App routes & views', () => {
  it('GET / should render home page', (done) => {
    request(app)
      .get('/')
      .expect((res) => {
        if (res.status !== 200) throw new Error('Expected 200');
        if (!/html/.test(res.headers['content-type'] || '')) {
          throw new Error('Expected HTML content type');
        }
      })
      .end(done);
  });

  it('GET /auth/login should render login view', (done) => {
    request(app)
      .get('/auth/login')
      .expect(200)
      .expect((res) => {
        if (!/Sign in to your account/i.test(res.text || '')) {
          throw new Error('Login heading not found');
        }
      })
      .end(done);
  });
});
