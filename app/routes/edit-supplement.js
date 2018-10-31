import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  // set route properties and hooks

  // import ajax service for making ajax requests
  ajax: inject(),
  // get shared data for retriving supplement id to edit
  sharedData: inject(),

  // set model hook to fetch data
  model(){
    // get id from shared data service
    var id =  sessionStorage.getItem('editId'); // this.get('sharedData').get('supplementToEdit');

    // make ajax request for tags data
    var tagsData = this.get('ajax').request('/tags/all', { method: 'GET' });

    // make ajax request for supplement data
    var supplementData = this.get('ajax').request('/supplements?id=' + id, { method: 'GET' });

    // this.set('selectedTagIds', tagsData);

    // return hashed promises - set all fetched data in one object
    var data =  hash({
      // set supplement data
      supplement: supplementData,
      // set tags data
      tags: tagsData
    });

    var main = this;

    // get data from promise and set selected tags
   data.then(function(result) {  // var ids =

      var extractedIds = [];
      var extractedNames = [];
      var extractedImages = result.supplement[0].images;

      // loop through tags and get their ids
      for(let i = 0; i < result.supplement[0].tags.length; i++){
        extractedIds[i] = parseInt(result.supplement[0].tags[i]['id']);
        extractedNames[i] = result.supplement[0].tags[i]['name'];
      }

     main.sharedData.set('tagsToEditIds', extractedIds);
     main.sharedData.set('tagsToEditNames', extractedNames);
     main.sharedData.set('imagesToEdit', extractedImages);

     // return extractedIds;

    });

    // return model data
    return data;
  }


});
