import Component from '@ember/component';
import {
  observer,
  computed
} from '@ember/object';

export default Component.extend({
   // set component properties and actions

   // set component filter values
   adminFilters: computed(function(){
     return ['Admin', 'Manager', 'Developer'];
   }),//['Admin', 'Manager', 'Developer'],

   // set filter default value
   selectedScope: 'Admin',
   // set default value for dialog heading
   dialogHeading: 'Add',
   // set email default value
   enteredEmail: '',
   // set default value if user is adding or editing admin
   adminEditing: true,
   // observe admin editing property and set appropriate dialog heading and email values
   adminEditingObserver: observer('adminEditing', function(){
     if(this.get('adminEditing') === false){
       this.set('dialogHeading', 'Edit');
     }else {
       this.set('dialogHeading', 'Add');
       this.set('enteredEmail', '');
     }
   }),

   // set actions
   actions: {
      // close dialog
      closeDialog(){
        document.getElementById('dialogOverlay').style="display: none;";
        document.getElementById('adminDialogWrapper').style="display: none;";
      },
      // add admin
      addEditAdmin(){
        // set user selected scope
        this.set('selectedScope', this.get('selectedScope'));

        // call closure action to trigger appropriate controller action
        this.callAdminFunction();
        this.actions.closeDialog();
      }
   }
});
