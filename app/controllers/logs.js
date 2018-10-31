import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
// import ember object for using observer
import {
  observer,
  computed
} from '@ember/object';

export default Controller.extend({
  // set controller properties and actions

  // inject application controller to communicate over it with toast element
  applicationController: controller('application'),

  // inject ajax service for making ajax requests
  ajax: service(),

  // set default log date value
  selectedLogToDelete: '',
  // set default message value
  selectedMessageToSend: 'selectedMessageToSend',
  // set log filter values
  logFilters: computed(function(){
    return ['Admin', 'Mobile', 'Products', 'Supplements', 'Tags'];
  }),  // ['Admin', 'Mobile', 'Products', 'Supplements', 'Tags'],
  // set default log filter value
  currentFilter: 'Admin',
  // obseerve current filter value and make ajax request if changed
  currentFilterObserver: observer('currentFilter', function(){
    // get new filter data
    this.getLogs();
  }),

  // set actions
  actions: {

    closeDialog(){
      document.getElementById('emailDialogWrapper').style="display: none;";
      document.getElementById('confirmationDialog').style="display: none;";
      document.getElementById('dialogOverlay').style="display: none;";
    },

    // delete log action
    deleteLog(){
      // set this to main to avoid conflicts inside ajax function
      var main = this;

      // delete log
      var type = this.get('currentFilter').toLowerCase();
      var date = this.get('selectedLogToDelete');

      this.get('ajax').request('/monolog/log?type=' + type +  '&date=' + date, {
        method: 'DELETE',
        dataType: 'text',
        success: function () {
          // after deleting log get current data
          main.getLogs();
          main.callToast('Log deleted');
        },
        error: function () {
          main.callToast('Error');
        }
      });

    },

    // send email action
    sendEmail(){

      // TODO send email

      this.callToast('Email sended');
    }
  },


  // function outside actions for fetching current log data
  getLogs(){
    // set this to main to avoid conflicts inside ajax function
    var main = this;

    // get new data
    this.get('ajax').request('/monolog/logs?type=' + this.get('currentFilter').toLowerCase(), {
      method: 'GET',
      success: function (data) {
        // set new data to model for refreshing the page
        main.set('model', data);
      },
      error: function () {
        main.callToast('Error');
      }
    });
  },


  // call toast element from application template
  callToast(text){
    // use injected application controller to call its toast element
    this.get('applicationController').set('textForToast', text);
    this.get('applicationController').actions.openToast();
  }

});
