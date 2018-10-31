import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  // set controller properties and actions

  // inject application controller to communicate over it with toast element
  applicationController: controller('application'),

  // this property will hold selected tags
  selectedTagIds: computed(function(){
    return [];
  }),

  // this property will hold selected supplements
  selectedSupplementIds: computed(function(){
    return [];
  }),

  // this property will hold selected tags
  enteredName: '',

  // TODO check if this value is necessary
  enteredDescription: '',

  // inject ajax service for making ajax requests
  ajax: service(),

  // inject sharedData service to use sharedData
  sharedData: service(),

  // controller actions
  actions: {

    // on cancel return to supplements page
    goToProductsPage(){
      // clear placeholders
      this.clearData();

      // redirect to products page
      location.href = '/#/products';
    },

    // close delete product dialog
    closeDialog(){
      document.getElementById('confirmationDialog').style="display: none;";
      document.getElementById('dialogOverlay').style="display: none;";
    },

    // on save click, send data and redirect to supplements page
    saveData(){
      // get uploaded images
      var images = document.getElementById('inputFileElement').files;
      var oldImages = this.get('sharedData').get('imagesToEdit');
      var imagesToSend = [];

      // if images arent changed
      if(images.length === 0){

        var imagesExtracted = [];

        // loop through images and extract their names
        for(let i = 0; i < oldImages.length; i++){
          var index = oldImages[i].lastIndexOf('/') + 1;
          imagesExtracted[i] = oldImages[i].substr(index);
        }

        imagesToSend = imagesExtracted;

      // if new images are uploaded
      }else {
        // loop through uploaded images and extract their names
        for(let i = 0; i < images.length; i++){
          imagesToSend[i] = images[i].name;
        }
      }

      // set dimensions values
      var weight = document.getElementById('weightInput').value;
      var height = document.getElementById('heightInput').value;
      var length = document.getElementById('lengthInput').value;
      var width = document.getElementById('widthInput').value;
      var quantity = document.getElementById('quantityInput').value;

      // check if all dimension are entered
      if(weight.length > 0 && height.length > 0 && length.length > 0 && width.length > 0 && quantity.length > 0){
        // set dimensions array
        var dimensions = [
          weight,
          height,
          length,
          width,
          quantity
        ];
      }else {
        // if no call toast and return from the function
        this.callToast('Incomplete data');

        // return from the function
        return;
      }

      // format data
      var productData = {
        "id": sessionStorage.getItem('editId'),
        "sku_id": this.get('model').product[0].stripe_sku_id,
        "product_id": this.get('model').product[0].stripe_product_id,
        "name": document.getElementById('nameInput').value,
        "description": 'Description',
        "price": document.getElementById('priceInput').value,
        "discount": document.getElementById('discountInput').value,
        "supplements": this.get('selectedSupplementIds'),
        "dimensions": dimensions,
        "images": imagesToSend,
        "tags": this.get('selectedTagIds'),
        "out_of_stock": "false"
      };

      if(productData.price.length === 0 || productData.discount.length === 0 || productData.supplements.length === 0 || productData.name.length === 0 || productData.description.length === 0 || productData.images.length === 0 || productData.tags.length === 0){
        // use injected application controller to call its toast element
        this.callToast('Incomplete data');

        // return from the function
        return;
      }

      // if all data is there procede with the request and show progress bar
      document.getElementById('progressBar').classList.add('progressBarAnimation');

      // set this to main to avoid conflicts inside ajax request
      var main = this;

      // send request for adding supplement data to the database
      this.get('ajax').request('/products', {
        method: 'PUT',
        dataType: 'text',
        contentType: 'application/json',
        data: productData,
        success: function () {

          if(images.length > 0){
            main.sendImages(images);
          }else {
            // call toast
            main.callToast('Product edited');

            // if all data is there procede with the request and show progress bar
            document.getElementById('progressBar').classList.remove('progressBarAnimation');

            // redirect to supplements page
            location.href = "/#/products";
          }

        }
      });

    },


    // open dialog
    openConfirmationDialog(id){
      // set selected id so that new value is binded to appropriate controller value
      this.set('selectedId', id);
      // display needed elements
      document.getElementById('dialogOverlay').style="display: block;";
      document.getElementById('confirmationDialog').style="display: block;";
    },


    // delete product function
    deleteProduct(){

      // if all data is there procede with the request and show progress bar
      document.getElementById('progressBar').classList.add('progressBarAnimation');

      // get selected id
      var id = sessionStorage.getItem('editId');
      var productId = this.get('model').product[0].stripe_product_id;
      var skuId = this.get('model').product[0].stripe_sku_id;

      var main = this;

      // send request for deleting product
      var data = this.get('ajax').request('/products?id=' + id + '&product_id=' + productId + '&sku_id=' + skuId, {
        method: 'DELETE',
        dataType: 'text',
        success: function () {

          // get status code
          var status = data.xhr.status;

          if(status === 200){
            // call toast
            main.callToast('Product deleted');

            // clear placeholders
            main.clearData();

            // wait for 1 second so that images are uploaded to the server before request for the new data is made
            setTimeout(function(){
              // redirect to products page
              location.href = '/#/products';
            }, 1000);
          }else {
            // if all data is there procede with the request and show progress bar
            document.getElementById('progressBar').classList.remove('progressBarAnimation');

            // call toast
            main.callToast('Unable to delete product');
          }

        }, error: function(){
          // call toast
          main.callToast('Product deleted');

          // clear placeholders
          main.clearData();

          // wait for 1 second so that images are uploaded to the server before request for the new data is made
          setTimeout(function(){
            // redirect to products page
            location.href = '/#/products';
          }, 1000);
        }
      });

    },

  },


  // send images to the server
  sendImages(images){
    // send images to server
    for(let i = 0; i < images.length; i++){
      // create form object for sending files
      let formData = new FormData();

      // get uploaded images
      var file = document.getElementById('inputFileElement');

      // set form object
      formData.set('file', file.files[i], file.files[i].name);

      // send image request
      this.get('ajax').request('http://api.system.g6nutrition.com/upload', {  // g6-system:8888/upload  http://g6-system:8888/upload
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function () {

        }
      });

      // after last image has been sended to the server make following actions
      if(i === (images.length - 1)){
        // call toast
        this.callToast('Product edited');

        // clear placeholders
        this.clearData();

        // wait for 1 second so that images are uploaded to the server before request for the new data is made
        setTimeout(function(){
          // redirect to products page
          location.href = '/#/products';
        }, 1000);
      }
    }
  },

  // this function clears all the data that has been entered
  clearData(){
    this.set('enteredName', '');
    this.get('sharedData').set('supplementIdsToEdit', []);
    this.get('sharedData').set('tagsToEditNames', []);
    this.get('sharedData').set('tagsToEditIds', []);
    this.set('selectedTagIds', []);

    // if all data is there procede with the request and show progress bar
    document.getElementById('progressBar').classList.remove('progressBarAnimation');

    // set current page
    sessionStorage.setItem('currentPage', 'products');
  },

  // call toast
  callToast(text){
    // use injected application controller to call its toast element
    this.get('applicationController').set('textForToast', text);
    this.get('applicationController').actions.openToast();
  },


});
