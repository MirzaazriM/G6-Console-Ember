import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  // set component properties and actions

  // get shared data property from shared-data service
  sharedData: inject(),
  // set page default value
  page: 'products',
  // set default value for showEdit toggle property
  showEdit: true,
  // set default value for supplement to edit id
  supplementToEdit: 0,

  // component actions
  actions: {
    // after clicking on edit icon set supplement id to shared data, so that id can be used at edit-supplement route
    setSharedSupplementId(id){
      this.get('sharedData').set('supplementToEdit', id);

      window.scrollTo(0, 0);

      sessionStorage.setItem('editId', id);
      sessionStorage.setItem('currentPage', 'addEdit')
    }
  }
});
