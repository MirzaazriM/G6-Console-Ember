import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  // set controller properties and actions
  defaultModelData: computed(function(){
    return [];
  }),
  item: computed(function(){
    return [];
  }),
  searchActive: false,
  actionType: '',
  selectedSupplements: computed(function(){
    return [];
  }),
  sharedData: inject(),

  init(){
    this._super(...arguments);
  },

  didRender(){
    this._super(...arguments);
    this.set('selectedSupplements', this.get('sharedData').get('supplementIdsToEdit'));

    this.markSelectedSupplements();
  },

  // set actions
  actions: {

    searchSupplements(){

      this.set('searchActive', true);

      if(this.get('defaultModelData').length === 0){
        this.set('defaultModelData', this.get('item'));
      }

      // set model data as default model data
      var modelData = this.get('defaultModelData');

      // get value entered in search field
      var value = document.getElementById('supplementItemSearcher').value.toLowerCase();

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

        // set new model data as filtered data
        this.set('item', filteredModelData);

      }else {
        // set new model data as default model data
        this.set('item', this.get('defaultModelData'));
      }

      this.markSelectedSupplements();

    },

    selectUnselectSupplement(id){

      var supplementIn = false;

      var selectedSupplements = this.get('selectedSupplements');

      for(var i = 0; i < selectedSupplements.length; i++){
        if(selectedSupplements[i] === parseInt(id)){
          supplementIn = true;
        }
      }

      if(supplementIn === false){
        document.getElementById(id).style = "background-color: #0288D1; color: #fff";
        this.get('selectedSupplements').push(parseInt(id));
      }else {
        document.getElementById(id).style = "background-color: #fff; color: #444";
        var index = this.get('selectedSupplements').indexOf(parseInt(id));
        if (index > -1) {
          this.get('selectedSupplements').splice(index, 1);
        }
      }

    },


  },

  // mark tags when editing
  markSelectedSupplements(){

    if(this.get('actionType') === 'add'){

      var supplementIds = [];

      if(this.get('searchActive') === true){
        // get tag names
        supplementIds = this.get('selectedSupplements');
        // check which tag names to select
        for(let i = 0; i < supplementIds.length; i++){
          if(document.getElementById(supplementIds[i]) !== null){
            document.getElementById(supplementIds[i]).style = "background-color: #0288D1; color: #fff;";
          }
        }
      }

      //this.set('selectedSupplements', [])
    }else {
      // get tag names
      supplementIds = this.get('selectedSupplements');
      // check which tag names to select
      for(let i = 0; i < supplementIds.length; i++){
        if(document.getElementById(supplementIds[i]) !== null){
          document.getElementById(supplementIds[i]).style = "background-color: #0288D1; color: #fff;";
        }
      }
    }

  }

});
