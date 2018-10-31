import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  // set route properties and hooks

  // inject ajax service for making ajax requests
  ajax: inject(),

  // set model for fetching admins data
  model(){
    // get data
    var data = this.get('ajax').request('/admin/all', { method: 'GET' });

    // return data
    return data;
  }

});
