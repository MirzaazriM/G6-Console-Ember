import Controller from '@ember/controller';
import {
  observer
} from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  // set dashboard properties and actions

  selectedFilterValue: 'Last 7 Days',
  observerFilter: observer('selectedFilterValue', function(){

    var num = 0;

    var period = this.get('selectedFilterValue');

    if(period === 'Last 7 Days'){
      num = 7;
    }else if(period === 'Last Month'){
      num = 30;
    }else if(period === 'Last 3 Months'){
      num = 90;
    }else {
      num = 365;
    }


    var data = this.get('ajax').request('/statistics/periods?period=' + num, { method: 'GET' });

    data.then(function(result){
      document.getElementById('itemsSold').innerHTML = result.sales;
      return result.sales;
    });
  }),

  // import ajax service for making ajax requests
  ajax: inject(),

  actions: {
    // this functions generates random number when users filter number of sold products by given periods
    changeItemsSoldData(){

      // TODO delete this function

      // var num = 0;
      //
      // var period = this.get('selectedFilterValue');
      //
      // if(period === 'Last 7 Days'){
      //   num = 7;
      // }else if(period === 'Last Month'){
      //   num = 30;
      // }else if(period === 'Last 3 Months'){
      //   num = 90;
      // }else {
      //   num = 365;
      // }
      //
      //
      // var data = this.get('ajax').request('/statistics/periods?period=' + num, { method: 'GET' });
      //
      // data.then(function(result){
      //   document.getElementById('itemsSold').innerHTML = result.sales;
      //   return result.sales;
      // });
    }
  }
});
