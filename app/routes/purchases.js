import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  // set route properties and hooks

  // import ajax service for making ajax requests
  ajax: inject(),

  // set model hook for fetching data for the purchases page
  model(){
    // return data
    var purchasesData = this.get('ajax').request('/statistics/transactions', { method: 'GET' });
    var quantityData = this.get('ajax').request('/statistics/quantities', { method: 'GET' });

    var data = hash({
      purchases: purchasesData,
      statistic: quantityData
    });

    // return data
    return data;
  }
});
