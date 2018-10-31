import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  // set component properties and actions
  actionType: '',
  sharedData: inject(),
  selectedTags: computed(function(){
    return [];
  }),
  selectedTagsNames: computed(function(){
    return [];
  }),

  didRender(){
    this._super(...arguments);
    this.set('selectedTags', this.get('sharedData').get('tagsToEditIds'));
    this.set('selectedTagsNames',  this.get('sharedData').get('tagsToEditNames'));
    this.markSelectedTags();
  },

  // set actions
  actions: {
    selectUnselectTag(name, id){

      var tagIn = false;

      var selectedTags = this.get('selectedTags');

      for(var i = 0; i < selectedTags.length; i++){
        if(selectedTags[i] === parseInt(id)){
          tagIn = true;
        }
      }

      if(tagIn === false){
        document.getElementById(name).style = "background-color: #111";
        this.get('selectedTags').push(parseInt(id));
      }else {
        document.getElementById(name).style = "background-color: #999";
        var index = this.get('selectedTags').indexOf(parseInt(id));
        if (index > -1) {
          this.get('selectedTags').splice(index, 1);
        }
      }
    },

  },


  // mark tags when editing
  markSelectedTags(){

    if(this.get('actionType') === 'add'){
      var tagNames = [];
    }else {
      // get tag names
      tagNames = this.get('sharedData').get('tagsToEditNames');
    }

    // check which tag names to select
    for(let i = 0; i < tagNames.length; i++){
      document.getElementById(tagNames[i]).style = "background-color: #111";
    }

  }


});
