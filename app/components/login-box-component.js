import Component from '@ember/component';

export default Component.extend({

  didInsertElement(){
    this._super(...arguments);
    var logged = sessionStorage.getItem('logged');

    if(logged === 'true'){
      document.getElementById('loginBox').style="display:none";
      document.getElementById('loginBoxDialogOverlay').style="display:none";
    }else {
      document.getElementById('loginBox').style="display:block";
      document.getElementById('loginBoxDialogOverlay').style="display:block";
    }
  },

  actions: {
    logIn() {

      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;

      if(username === 'G6Nutritions' && password === 'sportsnutritions2018'){
        document.getElementById('loginBox').style="display:none";
        document.getElementById('loginBoxDialogOverlay').style="display:none";

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        sessionStorage.setItem('logged', true);
      }else {

        // show toast
        document.getElementById('toast').style = "animation-name: toastAnimation; animation-duration: 3s;";
        // remove animation so that animation can be started again on the same way
        setTimeout(function(){
          document.getElementById('toast').style = "animation-name: no;";
        }, 3000);
      }


    }
  }
});
