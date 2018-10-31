import Component from '@ember/component';

export default Component.extend({
  // set component properties and values

  // set default selected id value
  selectedId: 0,

  // set actions
  actions: {
    // open dialog
    openConfirmationDialog(id){
      // set selected id so that new value is binded to appropriate controller value
      this.set('selectedId', id);
      // display needed elements
      document.getElementById('dialogOverlay').style="display: block;";
      document.getElementById('confirmationDialog').style="display: block;";
    }
  }
});
