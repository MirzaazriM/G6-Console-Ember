import Component from '@ember/component';

export default Component.extend({
  // set component properties and actions

  purchase: 0,

  // dialog values
  productName: '',
  quantity: 0,
  customerName: '',
  address: '',
  contact: '',

  actions: {

    openDetailsDialog(id){
      this.set('purchase', id);

      this.callDetailsDialog();
    }

  }
});
