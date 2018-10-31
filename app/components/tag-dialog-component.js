import Component from '@ember/component';

export default Component.extend({
  enteredTag: '',
  actions: {
    closeDialog(){
      document.getElementById('dialogOverlay').style="display: none;";
      document.getElementById('tagDialogWrapper').style="display: none;";
    },
    addTag(){
      this.callAddTag();
      this.actions.closeDialog();
    }
  }
});
