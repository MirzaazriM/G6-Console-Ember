import Component from '@ember/component';

export default Component.extend({
  // set component properties and actions

  // set actions
  actions: {
    // close dialog when clicked 'No' button
    closeDialog(){
      document.getElementById('dialogOverlay').style="display: none;";
      document.getElementById('confirmationDialog').style="display: none;";
    },
    // make appropriate action when clicked 'Yes' button
    delete(){
      // trigger closure action so that appropriate controller function can make request
      this.callDelete();
      document.getElementById('dialogOverlay').style="display: none;";
      document.getElementById('confirmationDialog').style="display: none;";
    }
  }
});
