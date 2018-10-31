import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import  {
  computed,
} from '@ember/object';

export default Controller.extend({
  // set controller properties and actions

  // inject application controller to communicate over it with toast element
  applicationController: controller('application'),

  // this value will hold selected tag names when adding and editing supplement
  selectedTagIds: computed(function(){
    console.log("selected tags");
    return [];
  }),

  // this value is binded to the name property of the name-input-component and helps communicate with that component
  enteredName: '',

  // this value is binded to the description property of the description-input-component and helps communicate with that component
  enteredDescription: '',

  // this value is an ajax service for making ajax requests
  ajax: service(),

  // this value represents sharedData service, and its used to share data accross components, controllers, routes...
  sharedData: service(),

  // set page actions
  actions: {

    // on cancel return to supplements page
    goToSupplementsPage(){
      this.clearData();

      // redirect to supplements page
      location.href = '/#/supplements';
    },

    // cancel deleting supplement
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
          var name = images[i].name;
          name = name.split(' ').join('_');
          imagesToSend[i] = name;
        }

      }

      // format data for the rwquest
      var supplementData = {
        "id": this.get('sharedData').get('supplementToEdit'),
        "name": document.getElementById('nameInput').value,
        "description": document.getElementById('descriptionInput').value,
        "images": imagesToSend,
        "tags": this.get('selectedTagIds'),
        "out_of_stock": "false"
      };

      // check if necessary data is there
      if(supplementData.name.length === 0 || supplementData.description.length === 0 || supplementData.images.length === 0 || supplementData.tags.length === 0){
        // use injected application controller to call its toast element
        this.callToast('Incomplete data');

        // return from the function
        return;
      }

      // clear data if all data is there
      this.clearData();

      // if all data is there procede with the request and show progress bar
      document.getElementById('progressBar').classList.add('progressBarAnimation');

      // set this to main so that we can use it inside ajax request
      var main = this;

      // send request for adding supplement data to the database
      this.get('ajax').request('/supplements', {
        method: 'PUT',
        dataType: 'text',
        contentType: 'application/json',
        data: supplementData,
        success: function () {

         // var status = data.xhr.status;

            if(images.length > 0){
              main.sendImages(images);
            }else {
              // call toast
              main.callToast('Supplement edited');

              // if all data is there procede with the request and show progress bar
              document.getElementById('progressBar').classList.remove('progressBarAnimation');

              // redirect to supplements page
              location.href = "/#/supplements";
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


    // delete supplement action
    deleteSupplement(){
      // get selected id
      var id = this.get('sharedData').get('supplementToEdit');

      // if all data is there procede with the request and show progress bar
      document.getElementById('progressBar').classList.add('progressBarAnimation');

      var main = this;

      // send request for deleting tag and get all tags again
      var data = this.get('ajax').request('/supplements?id=' + id, {
        method: 'DELETE',
        dataType: 'text',
        success: function () {

          var status = data.xhr.status;

          if(status === 200){
            main.callToast('Supplement deleted');

            // clear data
            main.clearData();

            // wait for 1 second so that images are uploaded to the server before request for the new data is made
            setTimeout(function(){
              // redirect to products page
              location.href = '/#/supplements';
            }, 1000);
          }else {
            // remove animation class from progress bar element
            document.getElementById('progressBar').classList.remove('progressBarAnimation');

            main.callToast('Unable to delete supplement');
          }

        }
      });

    },

  },


  // send images
  sendImages(images){
    // send images to server
    for(let i = 0; i < images.length; i++){
      // create form object for sending file
      let formData = new FormData();

      // get uploaded files
      var file = document.getElementById('inputFileElement');

      // format image name so that there is no whitespaces
      var name = file.files[i].name;
      name = name.split(' ').join('_');

      // set format data object
      formData.set('file', file.files[i], name);

      // send image request
      this.get('ajax').request('http://api.system.g6nutrition.com/upload', {  // g6-system:8888  api.system.g6nutrition.com
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function () {

        }
      });

      if(i === (images.length - 1)){
        // call toast
        this.callToast('Supplement edited');

        // clear data
        this.clearData();

        // wait for 1 second so that images are uploaded to the server before request for the new data is made
        setTimeout(function(){
          // redirect to products page
          location.href = '/#/supplements';
        }, 1000);
      }
    }

  },

  // clear placeholders data function
  clearData(){
    this.get('sharedData').set('supplementIdsToEdit', []);
    this.get('sharedData').set('tagsToEditNames', []);
    this.get('sharedData').set('tagsToEditIds', []);
    this.set('selectedTagIds', []);

    // remove animation class from progress bar element
    document.getElementById('progressBar').classList.remove('progressBarAnimation');

    // set current page
    sessionStorage.setItem('currentPage', 'supplements');
  },

  // call toast
  callToast(text){
    // use injected application controller to call its toast element
    this.get('applicationController').set('textForToast', text);
    this.get('applicationController').actions.openToast();
  }

});
