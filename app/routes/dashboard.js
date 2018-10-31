import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  // set route actions and properties

  // import ajax service for making ajax requests
  ajax: inject(),

  // hook data to the route
  model(){

    // get last 2 added products
    var dataLast = this.get('ajax').request('/products/last', { method: 'GET' });

    // get number of active products
    var dataActive = this.get('ajax').request('/products/active', { method: 'GET' });

    // get number of active products
    var dataSales = this.get('ajax').request('/statistics/countries', { method: 'GET' });

    // data for items sold
    var sold = this.get('ajax').request('/statistics/periods?period=7', { method: 'GET' });

    // return hashed promises - set all fetched data in one object so that all fetched data can be returned inside this route model
    return hash({
      // set last as last added products
      last: dataLast,
      // set active as number of active products
      active: dataActive.then(function(result){   // we use then function to fetch data from the promise
        return result[0].number;
      }),
      // set sold as number of sold products
      sold: sold,
      // set stats as dummy data for sellings graph
      stats: dataSales
    });

  }
});
