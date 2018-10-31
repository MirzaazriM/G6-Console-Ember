import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | add-product', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:add-product');
    assert.ok(route);
  });
});
