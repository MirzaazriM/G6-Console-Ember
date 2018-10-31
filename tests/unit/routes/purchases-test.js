import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | purchases', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:purchases');
    assert.ok(route);
  });
});
