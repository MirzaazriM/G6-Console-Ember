import Component from '@ember/component';

export default Component.extend({
  clickedPeriod: 'Last 7 Days',
  actions: {
    selectPeriod(item){
      this.set('clickedPeriod', item);
    }
  }
});
