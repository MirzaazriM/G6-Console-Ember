import Component from '@ember/component';

export default Component.extend({
  // set component properties and actions

  // set default value of selected log (log date)
  selectedLog: '',

  // set actions
  actions: {

    // open confirmation dialog and set selectedLog value
    openConfirmationDialog(date){
      this.set('selectedLog', date);
      document.getElementById('dialogOverlay').style="display: block;";
      document.getElementById('confirmationDialog').style="display: block;";
    },
    // open email dialog and set message value
    openEmailDialog(message){
      document.getElementById('dialogOverlay').style="display: block;";
      document.getElementById('emailDialogWrapper').style="display: block;";
      document.getElementById('emailBodyInput').value = message;
    }
  }
});
