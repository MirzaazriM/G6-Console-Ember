import Service from '@ember/service';
import  {
  computed
} from '@ember/object';

export default Service.extend({
  serviceData: 'Data from service',
  sharedTagData: computed(function(){
    return [];
  }),
  supplementToEdit: 0,
  tagsToEditIds: computed(function(){
    return [];
  }),
  tagsToEditNames: computed(function(){
    return [];
  }),
  imagesToEdit: computed(function(){
    return [];
  }),
  supplementIdsToEdit: computed(function(){
    return [];
  }),

  actions: {
    setTagData(data){
      this.set('sharedTagData', data);
    },
    setSupplementToEditId(id){
      this.set('supplementToEdit', id);
    }
  }
});
