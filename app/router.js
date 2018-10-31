import EmberRouter from '@ember/routing/router';


import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard');
  this.route('supplements');
  this.route('products');
  this.route('purchases');
  this.route('tags');
  this.route('logs');
  this.route('admins');
  this.route('help');
  this.route('add-product');
  this.route('edit-product', {
    path: 'edit-product/:id'
  });
  this.route('add-supplement');
  this.route('edit-supplement', {
    path: 'edit-supplement/:id'
  });
  this.route('loading');
  this.route('error');
  this.route('page-not-found', {path: '/*wildcard'});
});

export default Router;
