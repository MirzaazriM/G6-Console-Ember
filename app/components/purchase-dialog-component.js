import Component from '@ember/component';

export default Component.extend({
  // set dialog properties and actions

  purchase: 0,
  state: '',

  actions: {
    closeDetailsDialog(){
      document.getElementById('detailsDialogWrapper').style="display: none;";
      document.getElementById('dialogOverlay').style="display: none;";

      this.set('purchase', 0);
    },

    setShipped(){
      this.set('state', 'in process');
      this.changeState();
    },

    setReceived(){
      this.set('state', 'yes');
      this.changeState();
    }
  }

});
