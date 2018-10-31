import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';

export default Controller.extend({
  // set controller properties and actions

  // inject application controller to communicate over it with toast element
  applicationController: controller('application'),
  // inject ajax service for making ajax requests
  ajax: service(),
  // set default value of entered email
  selectedEmailToSend: '',

  // set default value of selected scope
  selectedScopeToSend: 'Admin',
  // set default id value of selected admin
  selectedIdToDelete: 0,
  // set default value if user is adding or editing admin - this value is binded to appropriate components values
  isAdminEditing: true,

  // set actions
  actions: {

    // open add admin dialog
    openAddAdminDialog() {
      // set is editing value
      this.set('isAdminEditing', true);

      // display neccessary elements
      document.getElementById('dialogOverlay').style="display: block;";
      document.getElementById('adminDialogWrapper').style="display: block;";
    },


    closeDialog(){
      document.getElementById('adminDialogWrapper').style="display: none;";
      document.getElementById('dialogOverlay').style="display: none;";
    },

    // delete admin
    deleteAdmin(){
      // set this to main so that there is no conflict inside ajax request
      var main = this;

      // delete admin request and fetch new data
      this.get('ajax').request('/admin/remove?id=' + this.get('selectedIdToDelete'), {
        method: 'DELETE',
        dataType: 'text',
        success: function () {
          main.callToast('Admin deleted');
          main.getAdmins();
        },
        error: function(){
          main.callToast('Error');
        }
      });

    },


    // add/edit admin
    addEditAdmin(){
      // check which action to take
      if(this.get('isAdminEditing') === true){
        // get entered email and scope values
        var email = document.getElementById('adminEmailInput').value;
        var scope = this.get('selectedScopeToSend');

        // format data to send
        var dataToSend = {
          'email': email,
          'scope': scope
        };

        // set this to main so that there is no conflict inside ajax request
        var main = this;

        // send post request for adding admin
        this.get('ajax').request('/admin/add', {
          method: 'POST',
          dataType: 'text',
          contentType: 'application/json',
          data: dataToSend,
          success: function () {
            main.callToast('Admin added');
            // make request to get new data
            main.getAdmins();
          },
          error: function () {
            // make request to get new data
            main.getAdmins();
            main.callToast('Error');
          }
        });

      }else {
        // get id and scope values
        var id = this.get('selectedIdToDelete');
        var updateScope = this.get('selectedScopeToSend');

        // format data to send
        var updateDataToSend = {
          'id': id,
          'scope': updateScope
        };

        // set this to main so that there is no conflict inside ajax request
        var mainUpdate = this;

        // send post request for adding admin
        this.get('ajax').request('/admin/edit', {
          method: 'PUT',
          dataType: 'text',
          contentType: 'application/json',
          data:  updateDataToSend,
          success: function () {
            mainUpdate.callToast('Admin edited');
            // make request to get updated data
            mainUpdate.getAdmins();
          },
          error: function () {
            mainUpdate.callToast('Error');
            // make request to get updated data
            mainUpdate.getAdmins();
          }
        });

      }
    },

  },


  callToast(text){
    // use injected application controller to call its toast element
    this.get('applicationController').set('textForToast', text);
    this.get('applicationController').actions.openToast();
  },


  // get admins
  getAdmins(){

    // set this to main so that there is no conflict inside ajax request
    var main = this;

    // get new data and update model for refreshing the page
    return this.get('ajax').request('/admin/all', {
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
