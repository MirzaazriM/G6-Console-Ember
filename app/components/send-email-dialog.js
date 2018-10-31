import Component from '@ember/component';

export default Component.extend({
  // set component properties and actions

  // set actions
  actions: {

    // close dialog if 'Cancel' clicked
    closeDialog(){
      document.getElementById('emailDialogWrapper').style="display: none;";
      document.getElementById('dialogOverlay').style="display: none;";
    },
    // close dialog and call closure action to trigger appropriate controller function
    sendEmail(){
      // call closure
      this.callSendEmail();
      // close dialog
      this.actions.closeDialog();
    }
  }
});
