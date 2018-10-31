import Controller from '@ember/controller';
import { inject } from '@ember/service';
import  {
  observer,
  computed
} from '@ember/object';

export default Controller.extend({
   // set controller properties and actions
  defaultModelData: computed(function(){
    return [];
  }),

  // this value will track old model data length
  modelLength: 0,
  searching: false,

  modelObserver: observer('model', function(){

    // we need this model lengths to see if user deleted, edited or added new supplement and to avoid setting --
    // --> defaultModelData when user is searching
    var oldLength = this.get('modelLength');
    var newLength = this.get('model').length;

    var searching = this.get('searching');

    // check if user edited added or deleted supplement
    if((oldLength === newLength || oldLength === (newLength - 1) || oldLength === (newLength +  1)) && searching === false){
      this.set('defaultModelData', this.get('model'));
      this.set('modelLength', this.get('model').length);
    }

    // on first loading of the page set default model as model
    if(this.get('defaultModelData').length === 0 || this.get('searchTriggersModelChange') === true){
      this.set('defaultModelData', this.get('model'));
      this.set('modelLength', this.get('model').length);
    }

  }),

  // inject ajax service for making ajax requests
  ajax: inject(),

   // set actions
  actions: {
    searchSupplements(){
      // set model data as default model data
      var modelData = this.get('defaultModelData');

      // get value entered in search field
      var value = document.getElementById('supplementSearcher').value.toLowerCase();

      if(value !== ''){
        // set value for filtered data
        var filteredModelData = [];

        // loop through values
        for(var i = 0; i < modelData.length; i++){

          // get name of current product
          var name = modelData[i].name;
          name = name.toLowerCase();

          // check if product name contains entered value
          if(name.indexOf(value) !== -1){
            // if yes set it to the filtered array
            filteredModelData.push(modelData[i])
          }
        }

        this.set('searching', true);

        // set new model data as filtered data
        this.set('model', filteredModelData);
      }

      else {

        this.set('searching', true);

        // set new model data as default model data
        this.set('model', this.get('defaultModelData'));
      }

      this.set('searching', false);

    }
  }
});
