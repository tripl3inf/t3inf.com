# Shapeshifter

Manage runtime changes for Ember applications. 

```
$ bower install shapeshifter
```

There is a [template project for getting started here](//github.com/daliwali/shapeshifter/tree/master/skeleton). 

### Usage

One must first register a change, which does not load the changes right away.

```js
var App = Ember.Application.create();
App.Shapeshifter.register('some-addon', function() {
  this.extend('template:new-page', /* Handlebars template function */);
  this.extend('controller:new-page', {
    foo: 'bar'
  });
  this.extend('view:new-page', {
  	templateName: 'new-page'
  });
});
```

Changes then can be loaded and unloaded at any point when the app is running.

```js
App.Shapeshifter.load('some-addon');
App.Shapeshifter.unload('some-addon');
```

A change does not have to be registered first to be loaded, if `load` is called before it is registered, it will be put in a queue so that it loads when it is registered.

### Why did you name this Shapeshifter, and not a boring name like Ember.Addon? Are you on drugs?

Because life is complicated.

### Caveats

- Only templates, views, controllers, and components right now.
- Changes can only extend things.
