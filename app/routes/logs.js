import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  // set route properties and hooks

  // inject ajax service for making ajax requests
  ajax: inject(),

  // fetch data for the page
  model(){
    // get data
    var data = this.get('ajax').request('/monolog/logs?type=admin', { method: 'GET' });

    // return fetched data
    return data;
  }

});
