import Component from '@ember/component';

export default Component.extend({
  // set component properties and actions

  // set default value for adminEditing
  adminEditing: true,
  // set default value for selected admin id
  selectedId: 0,
  // set entered email
  enteredEmail: '',
  // set default scope
  oldScope: '',

  // set actions
  actions: {
    // open confirmation dialog
    openConfirmationDialog(id){
      // set selectedId
      this.set('selectedId', id);

      // display necessary elements
      document.getElementById('dialogOverlay').style="display: block;";
      document.getElementById('confirmationDialog').style="display: block;";
    },
    // open admin dialog
    openEditDialog(id, email, scope){
      // set selectedId
      this.set('selectedId', id);
      // set is editing value
      this.set('adminEditing', false);
      // set email value
      this.set('enteredEmail', email);
      // set scope value for editing
      this.set('oldScope', scope);

      // display necessary elements
      document.getElementById('dialogOverlay').style="display: block;";
      document.getElementById('adminDialogWrapper').style="display: block;";
    }
  }
});
