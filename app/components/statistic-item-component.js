import Component from '@ember/component';

// import needed ember objects
import {
  computed
} from '@ember/object';

export default Component.extend({
  // set component properties and actions

  selectedItem: '',

  // default value for last two added products
  dataLast: computed(function(){
    return [];
  }),
  // init value for component heading
  heading: 'Last Added Items',
  // default value for component number of active products
  number: 0,
  // default value for setting filter visibility
  showFilter: false,
  // default value for setting last added prodicts container visibility
  showLastAdded: false,
  // default value for setting number visibility
  showNumber: true,
  // default value for setting filter values
  periodFilters: computed(function(){
    return ['Last 7 Days', 'Last Month', 'Last 3 Months', 'Last Year'];
  }), // ['Last 7 Days', 'Last Month', 'Last 3 Months', 'Last Year'],


  actions: {
    callDashboardPage(){
      this.callDashboard();
    }
  }
});
