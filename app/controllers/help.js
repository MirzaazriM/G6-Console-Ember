import Controller from '@ember/controller';
import { inject } from '@ember/controller';

export default Controller.extend({
  applicationController: inject('application'), // Ember.inject.controller('application'),

  actions: {
    openDialog(){
      document.getElementById('emailDialogWrapper').style="display: block;";
      document.getElementById('dialogOverlay').style="display: block;";
    },
    closeDialog(){
      document.getElementById('emailDialogWrapper').style="display: none;";
      document.getElementById('dialogOverlay').style="display: none;";
    },
    sendEmail(){
      // var email = document.getElementById('emailInput').value;
      // var emailBody = document.getElementById('emailBodyInput').value;
      //
      // var emailData = {
      //   "email": email,
      //   "emailBody": emailBody
      // };


      this.get('applicationController').set('textForToast', 'Email sended');
      this.get('applicationController').actions.openToast();


      // this.get('ajax').request('/email/send', {
      //   method: 'POST',
      //   dataType: 'json',
      //   contentType: 'application/json',
      //   data: emailData,
      //   success: function (data, status) {
      //     console.log(status);
      //     //this.transitionToRoute('/admins');
      //     //location.href="/tags";
      //     //this.actions.red();
      //   },
      //   error: function (jqXHR, status, err) {
      //     console.log(err)
      //     //location.href="/tags";
      //     //this.actions.red();
      //   },
      //   complete: function (jqXHR, status) {
      //     console.log("Finished");
      //     //this.actions.red();
      //
      //   }
      // });
    }
  }
});
