import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({

  sharedData: inject(),
    didRender(){
      this._super(...arguments);
      var currentPage = sessionStorage.getItem('currentPage');
      if(currentPage === null){
        document.getElementById('dashboard').style="background-color: #0288D1; color: #fff";
      }else {
        if(sessionStorage.getItem('currentPage') !== 'addEdit'){
          document.getElementById(sessionStorage.getItem('currentPage')).style="background-color: #0288D1 ; color: #fff";
        }
      }
    },
    menuItemSelected: '',
    menuItems: computed(function(){
      return [
        {
          item: 'dashboard',
          icon: 'view-dashboard.svg'
        },
        {
          item: 'supplements',
          icon: '003-protein.svg'
        },
        {
          item: 'products',
          icon: 'proteins.svg'
        },
        {
          item: 'purchases',
          icon: 'cart.svg'
        },
        {
          item: 'tags',
          icon: 'tag.svg'
        },
        {
          item: 'logs',
          icon: 'clipboard-text.svg'
        },
        {
          item: 'admins',
          icon: 'account-supervisor-circle.svg'
        },
        {
          item: 'help',
          icon: 'help-circle.svg'
        }
      ];
    }),


  // [
    //   {
    //     item: 'dashboard',
    //     icon: 'view-dashboard.svg'
    //   },
    //   {
    //     item: 'supplements',
    //     icon: '003-protein.svg'
    //   },
    //   {
    //     item: 'products',
    //     icon: 'proteins.svg'
    //   },
    //   {
    //     item: 'purchases',
    //     icon: 'cart.svg'
    //   },
    //   {
    //     item: 'tags',
    //     icon: 'tag.svg'
    //   },
    //   {
    //     item: 'logs',
    //     icon: 'clipboard-text.svg'
    //   },
    //   {
    //     item: 'admins',
    //     icon: 'account-supervisor-circle.svg'
    //   },
    //   {
    //     item: 'help',
    //     icon: 'help-circle.svg'
    //   }
    // ],

    actions: {
      setClickedItemStyle: function(item) {
        for(let i = 0; i < this.get('menuItems').length; i++){
          if(this.get('menuItems')[i].item !== item){
            document.getElementById(this.get('menuItems')[i].item).style="background-color: transparent !important; color: #666";
          }else {
            document.getElementById(this.get('menuItems')[i].item).style="background-color: #0288D1; color: #ddd";
          }
        }

        // hide menu and menu overlay
        if(document.body.clientWidth < 701){
          document.getElementById('mainMenu').style = "display: none;";
          document.getElementById('menuOverlay').style = "display: none;";
        }

        sessionStorage.setItem('currentPage', item);

        this.set('menuItemSelected', sessionStorage.getItem('currentPage'));

        // clear service data
        this.set('enteredName', '');
        this.set('enteredDescription', '');
        this.get('sharedData').set('supplementIdsToEdit', []);
        this.get('sharedData').set('tagsToEditNames', []);
        this.get('sharedData').set('tagsToEditIds', []);
        this.set('selectedTagIds', []);
      }
    }

});
