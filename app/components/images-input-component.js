import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  // Set Component Properties and Actions

  // this value shows which action is user currently doing
  actionType: '',

  // TODO check this value
  image: '',

  // inject service to use sharedData
  sharedData: inject(),

  // this function calls setEditImages for setting default component values depending on current actionType
  didRender(){
    this._super(...arguments);

    // call setEditImages
    this.setEditImages();
  },


  // set component actions
  actions: {
    // this function opens browse window for uploading images
    openUploadImageWindow(){
      // click on inputFileElement in application template (browse window can only be called from application template)
      document.getElementById('inputFileElement').click();
    }
  },

  // set opening state of component depending on actionType value
  setEditImages(){
    // first clear imagesPreviewContainer
    var previewsContainer = document.getElementById('imagesPreviewContainer');
    previewsContainer.innerHTML = '';

    // check what is user doing
    if(this.get('actionType') === 'edit'){
      // if is editing get images from sharedData
      var images = this.get('sharedData').get('imagesToEdit');

      // this value will be innerHTML
      var imagesHTML = '';

      // loop through images and set them to previous declared variable
      for(var i = 0; i < images.length; i++){
        // create image
        var img = '<img src=' + images[i] + ' class="previewImage" />';

        // append image to global variable
        imagesHTML += img;
      }

      // set previewContainer innerHTML as imagesHTML
      previewsContainer.innerHTML = imagesHTML;

    }else {
      // if is adding, clear the input file
      document.getElementById('inputFileElement').value = '';
    }

  }

});
