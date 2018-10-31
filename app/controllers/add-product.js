import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  // set controller properties and actions

  // inject application controller to communicate over it with toast element
  applicationController: controller('application'),

  // inject sharedData service to use sharedData
  sharedData: service(),

  // this property will hold selected supplements
  selectedSupplementIds: computed(function(){
    return [];
  }),


  // this property will hold selected tags
  selectedTagIds: computed(function(){
    return [];
  }),


  // this property is binded to name component input value
  enteredName: '',

  // TODO check if this value is necessary
  enteredDescription: '',

  // inject ajax service for making ajax requests
  ajax: service(),

  // clear images in imagesPreviewContainer if any exists
  didRender(){
    this._super(...arguments);
    var previewsContainer = document.getElementById('imagesPreviewContainer');
    previewsContainer.innerHTML = '';
  },

  // controller actions
  actions: {
    // on cancel return to supplements page
    goToProductsPage(){
      // clear data
      this.clearData();

      // redirect to products page
      location.href = '/#/products';
    },

    // on save click, send data and redirect to products page
    saveData(){

      // get uploaded images
      var images = document.getElementById('inputFileElement').files;

      // images names holder
      var imageNames = [];

      // get image names for the database
      for(let i = 0; i < images.length; i++){
        var name = images[i].name;
        // replace whitespaces with _
        name = name.split(' ').join('_');
        imageNames[i] = name;
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

      // format data to send
      var productData = {
        "name": this.get('enteredName'),
        "description": "Description",
        "price": document.getElementById('priceInput').value,
        "discount": document.getElementById('discountInput').value,
        "supplements": this.get('selectedSupplementIds'),
        "dimensions": dimensions,
        "images": imageNames,
        "tags": this.get('selectedTagIds'),
        "out_of_stock": "false"
      };

      // check if all necessary data is set
      if(productData.price.length === 0 || productData.discount.length === 0 || productData.supplements.length === 0 || productData.name.length === 0 || productData.images.length === 0 || productData.tags.length === 0){
        // if no call toast and return from the function
        this.callToast('Incomplete data');

        // return from the function
        return;
      }

      // if all data is there procede with the request and show progress bar
      document.getElementById('progressBar').classList.add('progressBarAnimation');

      // set this to main to avoid conflicts inside ajax function
      var main = this;

      // send request for adding product data to the database
      var data = this.get('ajax').request('/products', {
        method: 'POST',
        dataType: 'text',
        contentType: 'application/json',
        data: productData,
        success: function () {

          var status = data.xhr.status;

          if(status === 200){
            // if data is added, send images to the server
            main.sendImages(images);
          }else {
            // remove animation class from progress bar element
            document.getElementById('progressBar').classList.remove('progressBarAnimation');

            // call toast
            main.callToast('Unable to add product');
          }

        }
      });

    },

  },


  // this function clears all the data that has been entered
  clearData(){
    this.set('enteredName', '');
    this.get('sharedData').set('supplementIdsToEdit', []);
    this.get('sharedData').set('tagsToEditNames', []);
    this.get('sharedData').set('tagsToEditIds', []);
    this.set('selectedTagIds', []);

    // remove animation class from progress bar element
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


  // send uploaded images to the server
  sendImages(images){
    // loop through images and set one by one to the server
    for(let i = 0; i < images.length; i++){
      // create form data object
      let formData = new FormData();

      // get uploaded image files
      var file = document.getElementById('inputFileElement');

      // get name of the current image and replace whitespaces with _
      var name = file.files[i].name;
      name = name.split(' ').join('_');

      // set formData object to send
      formData.set('file', file.files[i], name);

      // send request
      this.get('ajax').request('http://api.system.g6nutrition.com/upload', { // api.system.g6nutrition.com  http://g6-system:8888/upload
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData
      });

      // after last image is sended call toast and redirect to products page
      if(i === (images.length - 1)){
        // call toast
        this.callToast('Product added');

        // clear the placeholders
        this.clearData();

        // wait for 1 second so that images are uploaded to the server before request for the new data is made
        setTimeout(function(){
          // redirect to products page
          location.href = '/#/products';
        }, 1000);

      }
    }

  }
});
