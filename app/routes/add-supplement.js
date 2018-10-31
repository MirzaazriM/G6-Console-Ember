import Route from '@ember/routing/route';
import { inject } from '@ember/service';


export default Route.extend({
  // set route properties and hooks

  // import ajax service for making ajax requests
  ajax: inject(),

  // set model hook to fetch data
  model() {
    // make ajax request for tags data
    var data = this.get('ajax').request('/tags/all', { method: 'GET' });

    // return tags data
    return data
  }
});
