import assert from 'assert';

  import Test from '../src/Test';

describe('Test', () => {
  
  it('return true when asked to', () => {
    assert.equal(Test.returnTrue(), true);
  });
});
