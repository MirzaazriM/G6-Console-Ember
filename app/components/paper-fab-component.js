import Component from '@ember/component';

export default Component.extend({
  // set component properties and actions

  // set default value of the page property
  page: '',

  actions: {
    changeCurrentPage(){
      sessionStorage.setItem('currentPage', 'addEdit');
    }
  }
});
