import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  // set route properties and hooks

  // import ajax service for making ajax requests
  ajax: inject(),

  // set model hook for fetching data for the page
  model(){
    // get data
    var data = this.get('ajax').request('/tags/all', { method: 'GET' });

    // return data
    return data;
  }

});
