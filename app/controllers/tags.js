import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';

export default Controller.extend({
  // set controller properties and actions

  // inject application controller to communicate over it with toast element
  applicationController: controller('application'),
  // inject ajax service to make ajax requests
  ajax: service(),
  // set default value of selected id
  selectedIdToDelete: 0,

  // set actions
  actions: {

    // open tag dialog
    openAddTagDialog() {
      document.getElementById('dialogOverlay').style="display: block;";
      document.getElementById('tagDialogWrapper').style="display: block;";
    },

    closeDialog(){
      document.getElementById('confirmationDialog').style="display: none;";
      document.getElementById('tagDialogWrapper').style="display: none;";
      document.getElementById('dialogOverlay').style="display: none;";
    },

    // delete tag action
    deleteTag(){
      // get selected id
      var id = this.get('selectedIdToDelete');
      // set this to main so that there is no conflict inside ajax request
      var main = this;

      // send request for deleting tag and get all tags again
      this.get('ajax').request('/tags/remove?id=' + id, {
        method: 'DELETE',
        dataType: 'text',
        success: function () {
          main.callToast('Tag deleted');
          main.getTags();
        },
        error: function () {
          main.callToast('Error');
          main.getTags();
        }
      });

    },

    // add tag action
    addTag(){
      // get tag value
      var tag = this.get('tagToAdd');
      // stringify it
      var tagData = {
        "name": tag
      };

      // set this to main so that there is no conflict inside ajax request
      var main = this;

      // send request for deleting tag and fetch all tags again
      this.get('ajax').request('/tags/add', {
        method: 'POST',
        dataType: 'text',
        contentType: 'application/json',
        data: tagData,
        success: function () {
          main.callToast('Tag added');
          main.getTags();
        },
        error: function(){
          main.callToast('Error');
        }
      });

    },

  },


  callToast(text){
    // use injected application controller to call its toast element
    this.get('applicationController').set('textForToast',text);
    this.get('applicationController').actions.openToast();
  },

  // fetch all tags and update model data
  getTags(){
    // set this to main so that there is no conflict inside ajax request
    var main = this;

    // send request for fetching all tags again
    this.get('ajax').request('/tags/all', {
      method: 'GET',
      success: function (data) {
        main.set('model', data);
      },
      error: function (data) {
        main.set('model', data);
      }
    });
  }
});
