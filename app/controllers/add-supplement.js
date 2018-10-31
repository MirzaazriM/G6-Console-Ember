import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  // Set Controller Properties And Actions

  // inject application controller to communicate over it with toast element
  applicationController: controller('application'),

  // this value will hold selected tag names when adding and editing supplement
  selectedTagIds: computed(function(){
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

  // this function clear all images from imagesPreviewContainer element
  didRender(){
    this._super(...arguments);
    var previewsContainer = document.getElementById('imagesPreviewContainer');
    previewsContainer.innerHTML = '';
  },

  // here are defined all actions which are triggered from the template, and posibbly from components via closure actions
  actions: {
    // on cancel return to supplements page
    goToSupplementsPage(){
      // before leaving the page delete all values
      this.clearData();

      // return to supplements page
      location.href = '/#/supplements';
    },

    // on save click, send data and redirect to supplements page
    saveData(){
      // get uploaded images files which will be sended to the appropriate server
      var images = document.getElementById('inputFileElement').files;

      // this value will hold images names, and we need it so that the image names can be inserted in database approprietely
      var imageNames = [];

      // here we set data to previous declared variable
      for(let i = 0; i < images.length; i++){
        var name = images[i].name;
        name = name.split(' ').join('_');
        imageNames[i] = name;
      }

      // here we format data as JSON data so that request to the server is optimal
      var supplementData = {
        "name": this.get('enteredName'), // get entered name
        "description": this.get('enteredDescription'), // get entered description
        "images": imageNames, // get extracted image names
        "tags": this.get('selectedTagIds')
      };

      // this.get('sharedData').set('tagsToEditNames', []);
      // this.get('sharedData').set('tagsToEditIds', []);
      // this.set('selectedTagIds', []);

      // here we check if user entered all necessary data
      if(supplementData.name.length === 0 || supplementData.description.length === 0 || supplementData.images.length === 0 || supplementData.tags.length === 0){
        // call toast element from application
        this.callToast('Incomplete data');

        // don't procede with rest of the function
        return;
      }

      // if all data is there procede with the request and show progress bar
      document.getElementById('progressBar').classList.add('progressBarAnimation');

      // set this to main so that we can use it inside ajax request
      var main = this;

      // send request for adding supplement data to the database
      var data = this.get('ajax').request('/supplements', {
        method: 'POST',
        dataType: 'text',
        contentType: 'application/json',
        data: supplementData,
        success: function () {

          var status = data.xhr.status;

          if(status === 200){
            // if data is added, send images to the server
            main.sendImages(images);
          }else {
            // remove animation class from progress bar element
            document.getElementById('progressBar').classList.remove('progressBarAnimation');

            main.callToast('Unable to add supplement');
          }

        }
      })

    },

  },


  // this function loops through uploaded images and sends them one by one to the server
  sendImages(images){
    // this value holds all the uploaded images
    var file = document.getElementById('inputFileElement');

    // send images to server
    for(let i = 0; i < images.length; i++){
      // here we create form data object for easier manipulation of sending the image
      let formData = new FormData();

      // this value extract current image name
      var name = file.files[i].name;
      // remove any whitespaces from image name
      name = name.split(' ').join('_');

      // set formData object
      formData.set('file', file.files[i], name);

      // send image request
      this.get('ajax').request('http://api.system.g6nutrition.com/upload', { // g6-system:8888  api.system.g6nutrition.com
        method: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function () {

        }
      });

      // after images are on the server, clear the data and go to supplements page
      if(i === (images.length -1)){
        // call toast element from application
        this.callToast('Supplement added');

        // clear placeholders
        this.clearData();

        // wait for 1 second so that images are uploaded to the server before request for the new data is made
        setTimeout(function(){
          // redirect to products page
          location.href = '/#/supplements';
        }, 1000);
      }
    }
  },


  // this function clears all the data that has been entered
  clearData(){
    this.set('enteredName', '');
    this.set('enteredDescription', '');
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
