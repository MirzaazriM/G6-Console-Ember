import Component from '@ember/component';

export default Component.extend({
  // set component properties and actions

  actions: {
    logout(){
      document.getElementById('userProfileDropdown').style = "display: none;";

      document.getElementById('loginBoxDialogOverlay').style = "display: block;";
      document.getElementById('loginBox').style = "display: block;";

      sessionStorage.setItem('logged', false);
    },

    stopEventPropagation(){

    }
  }
});
