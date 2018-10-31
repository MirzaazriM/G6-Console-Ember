import Component from '@ember/component';
import  {
  observer
} from '@ember/object';

export default Component.extend({

  currentPage: '',
  userDropdownOpened: false,
  dropdownState: false,
  userDropdownStateChanged: observer('dropdownState', function(){
    if(this.get('dropdownState') === false){
      document.getElementById('userProfileDropdown').style="display: none;";
      this.set('userDropdownOpened', false);
    }

  }),
  actions: {
    // toggle profile dropdown
    toggleUserDropdown(){
      if(this.get('userDropdownOpened') === false){
        document.getElementById('userProfileDropdown').style="display: block;";
        this.set('userDropdownOpened', true);
        this.set('dropdownState', true);
      }else {
        document.getElementById('userProfileDropdown').style="display: none;";
        this.set('userDropdownOpened', false);
      }
    },

    closeDropdowns(){
      // close user dropdown if opened
      document.getElementById('userProfileDropdown').style="display: none;";
      this.set('userDropdownOpened', false);

      // close filter dropdown if opened
      if(document.getElementById('filterDrop') !== null){
        document.getElementById('filterDrop').style="display: none !important;";
      }
    },

    // toggle menu
    toggleMenu(){
      document.getElementById('mainMenu').style = "display: block";
      document.getElementById('menuOverlay').style = "display: block";
    }

  }
});
