import Controller from '@ember/controller';
import { inject } from '@ember/service';
import  {
  observer
} from '@ember/object';

export default Controller.extend({
  // set controller properties and actions

  // dialog values
  productName: '',
  quantity: 0,
  customerName: '',
  address: '',
  contact: '',
  state: 'no',

  // inject ajax service for making ajax requests
  ajax: inject(),

  selectedPurchase: 0,
  obser: observer('selectedPurchase', function(){
    // block function if purchase value is 0
    if(this.get('selectedPurchase') === 0){
      return;
    }


    var id = this.get('selectedPurchase');

    var details = this.get('ajax').request('/statistics/purchase?id=' + id, { method: 'GET' });

    var main = this;

    details.then(function(result){

      var products = '';
      var quantities = '';


      for(var i = 0; i < result[0].products.length; i++){

        if(i < result[0].products.length -1){
          products += result[0].products[i].name + ', ';
          quantities += result[0].products[i].quantity + ', ';
        }else {
          products += result[0].products[i].name;
          quantities += result[0].products[i].quantity;
        }


      }

      main.set('productName', products);
      main.set('quantity', quantities);

      var address = result[0].street + ', ' + result[0].city + ', ' + result[0].postal_code + ', ' + result[0].location;
      main.set('customerName', result[0].name);
      main.set('address', address);
      main.set('contact', result[0].email);

      document.getElementById('detailsDialogWrapper').style="display: block;";
      document.getElementById('dialogOverlay').style="display: block;";

      // return purchase value to 0 so that clicking on the same purchase opens dialog again
    });

  }),


  // controller actions
  actions: {

    // download orders as .csv file
    downloadOrdersFile(){
      window.open('http://api.stripe.g6nutrition.com/stripe/orders');
    },

    // toggle tab
    changeTab(tab){
      if(tab === 'statistics'){
        document.getElementById('sellingStatisticsTab').style = "border-bottom: 2px solid #0288D1";
        document.getElementById('purchasesProductsTab').style = "border-bottom: 2px solid transparent";
        document.getElementById('productsTabContainer').style = "display: none";
        document.getElementById('statisticsTabContainer').style = "display: block";
      }else {
        document.getElementById('purchasesProductsTab').style = "border-bottom: 2px solid #0288D1";
        document.getElementById('sellingStatisticsTab').style = "border-bottom: 2px solid transparent";
        document.getElementById('productsTabContainer').style = "display: block";
        document.getElementById('statisticsTabContainer').style = "display: none";
      }
    },

    closeDialog(){
      document.getElementById('detailsDialogWrapper').style="display: none;";
      document.getElementById('dialogOverlay').style="display: none;";
    },

    openDetailsDialog(){
      // todo clear the mess

      // document.getElementById('detailsDialogWrapper').style="display: block;";
      // document.getElementById('dialogOverlay').style="display: block;";
    },

    changePurchaseState(){

      // stringify data
      var data = {
        "id": this.get('selectedPurchase'),
        "state": this.get('state')
      };

      // set this to main so that there is no conflict inside ajax request
      var main = this;

      // send request for deleting tag and fetch all tags again
      this.get('ajax').request('/statistics/state', {
        method: 'POST',
        dataType: 'text',
        contentType: 'application/json',
        data: data,
        success: function () {
          main.updateModel();
        },
        error: function(){

        }
      });

      document.getElementById('detailsDialogWrapper').style="display: none;";
      document.getElementById('dialogOverlay').style="display: none;";
      this.clearValues();

    }
  },

  updateModel(){
    var purchasesData = this.get('ajax').request('/statistics/transactions', { method: 'GET' });

    var main = this;

    purchasesData.then(function(result){
      main.set('model.purchases', result);
    });

  },


  clearValues(){
    console.log("Clearing values");
    this.set('selectedPurchase', 0);
  }

});
