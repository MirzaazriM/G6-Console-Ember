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
  model() {

    // make ajax request for tags data
    var tagsData = this.get('ajax').request('/tags/all', { method: 'GET' });


    // make ajax request for tags data
    var supplementsData = this.get('ajax').request('/supplements/all?from=0&limit=500', { method: 'GET' });

    // return hashed promises - set all fetched data in one object
    return hash({
      tags: tagsData,
      // extract only number from fetched json response
      supplements: supplementsData
    });

    // // return tags data
    // return data
  }
});
