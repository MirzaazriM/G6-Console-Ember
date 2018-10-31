import Component from '@ember/component';

export default Component.extend({

  // current loading skeleton values
  productSupplements: false,
  tags: false,
  purchases: false,
  logs: false,
  admins: false,
  dashboard: false,
  addEdit: false,

  didRender(){
    var page = sessionStorage.getItem('currentPage');

    this.showLoader(page);
  },


  // check which loader to show depending on current page
  showLoader(page){

    if(page === 'products' || page === 'supplements'){
      this.set('productSupplements', true);
    }else if(page === 'tags') {
      this.set('tags', true);
    }else if(page === 'purchases'){
      this.set('purchases', true);
    }else if(page === 'logs'){
      this.set('logs', true);
    }else if(page === 'admins'){
      this.set('admins', true);
    }else if(page === 'dashboard'){
      this.set('dashboard', true);
    }else if(page === 'addEdit'){
      this.set('addEdit', true);
    }else {
      this.set('dashboard', true);
    }

  }

});
