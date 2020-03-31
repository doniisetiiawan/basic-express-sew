// eslint-disable-next-line no-unused-vars
import should from 'should';
import mocha from 'mocha';

const { describe, it } = mocha;

describe('The World', () => {
  it('should say hello', () => {
    'Hello, World'.should.equal('Hello, World');
  });
  it('should say hello asynchronously!', (done) => {
    setTimeout(() => {
      'Hello, World'.should.equal('Hello, World');
      done();
    }, 300);
  });
});
