import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  // set controller actions and properties

  // set current route
  currentRouteFromSession: sessionStorage.getItem('currentPage'),
  currentRoute: computed('currentRouteFromSession', function() {
    let route = this.get('currentRouteFromSession');
    var currentPage = '';

    var location = window.location.href;
    if(location.indexOf('-product') !== -1){
      currentPage = 'Products';
    }else if(location.indexOf('-supplement') !== -1){
      currentPage = 'Supplements';
    }else {
      currentPage = route;
      if(currentPage === null){
        currentPage = 'dashboard';
      }
    }

    return `${currentPage}`;
  }),

  // set default value for isUserDropdownOpened property
  isUserDropdownOpened: false,
  // set default value for toast text
  textForToast: 'Invalid credentials',
  // set uploaded files property
  uploadedFiles: computed(function(){
    return [];
  }),

  // set actions
  actions: {
    // close user dopdown if clicked outside the dropdown
    closeUserDropdownIfOpened(){
      if(this.get('isUserDropdownOpened') === true){
        this.toggleProperty('isUserDropdownOpened');
      }

      if(document.getElementById('filterDrop') !== null){
        document.getElementById('filterDrop').style = "display: none";
      }
    },
    // open toast
    openToast(){
      // show toast
      document.getElementById('toast').style = "animation-name: toastAnimation; animation-duration: 3s;";
      // remove animation so that animation can be started again on the same way
      setTimeout(function(){
        document.getElementById('toast').style = "animation-name: no;";
      }, 3000);
    },
    // close overlay and menu on click
    closeOverlayAndMenu(){
      document.getElementById('menuOverlay').style = "display: none";
      document.getElementById('mainMenu').style = "display: none";
    },

    loadFile(event){

      // get uploaded files
      var files = document.getElementById('inputFileElement').files;
      this.set('uploadedFiles', files);

      var previewsContainer = document.getElementById('imagesPreviewContainer');
      previewsContainer.innerHTML = '';

      for(var i = 0; i < event.target.files.length; i++){
        var preview = URL.createObjectURL(event.target.files[i]);
        var img = document.createElement('img');
        img.src = preview;
        img.classList.add('previewImage');
        previewsContainer.appendChild(img);
      }

    }
  }
});
