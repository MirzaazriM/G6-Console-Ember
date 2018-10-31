import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  // set route properties and hooks

  // import ajax service for making ajax requests
  ajax: inject(),

  // set model hook for fetching page data
  model(){
    // get data
    var data = this.get('ajax').request('/supplements/all?from=0&limit=500', { method: 'GET' });

    // return data to the page
    return data;
  }

});
