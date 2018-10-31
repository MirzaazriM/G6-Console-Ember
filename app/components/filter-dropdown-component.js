import Component from '@ember/component';
import {
  observer
} from '@ember/object';


export default Component.extend({
  actionType: '',
  selected: '',
  selectedObserver: observer('selected', function(){
    document.getElementById('filterDrop').style="display: none !important;";
    this.set('statisticFilterOpened', false);
    if(this.get('actionType') === 'itemsSold'){
      // call closure action
      this.callStatistic();
    }
  }),

  statisticFilterOpened: false,

  actions: {
    toggleStatisticFilter(){

      var display = window.getComputedStyle(document.querySelector('#filterDrop')).display;

      if(display === 'none'){
        document.getElementById('filterDrop').style="display: block !important;";
      }else {
        document.getElementById('filterDrop').style="display: none !important;";
      }
    },

    stopHiding(){
      // this function when it it called prevents event bubbling to parent elemens
    }
  },

  callStatistic(){
    this.callStatisticItem();
  }
});
