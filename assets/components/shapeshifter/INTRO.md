# Introducing Shapeshifter: Manage Runtime Changes in Ember Applications

As client-side JavaScript applications grow in complexity, encapsulating parts of an app that may only be accessible to a fraction of users becomes an issue. The simple solution is to add conditional statements in the main application, but this may not be feasible due to the extra payload or the extended functionality being sensitive information, and it certainly isn't very maintainable. A better approach to registering changes and applying them is in order. That has been the motivation for developing Shapeshifter, a library for managing runtime changes in Ember applications. 

Shapeshifter loads itself as a namespace within an instance of an Ember application, and lets changes register from external sources. For example, suppose an Ember app is set up like so:

```js
var App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend({
	firstName: 'Doctor',
	lastName: 'Who'
});
```

A script loaded from an external source can register a change:

```js
App.Shapeshifter.register('tardis', function() {
	this.extend('controller:application', {
		isDoctorWho: function() {
			if(this.get('firstName') === 'Doctor' && this.get('lastName') === 'Who') {
				this.transitionTo('tardis');
			}
		}.observes('firstName', 'lastName')
	});
});
```

Then the main application can decide when to load and unload changes at any point in execution:

```js
if(timeTravel) {
	App.Shapeshifter.load('tardis');
} else {
	App.Shapeshifter.unload('tardis');
}
```

Why use Shapeshifter instead of directly reopening classes? Shapeshifter allows for changes that keep track of history. If change A and change B both override the same method, then loading A, B sequentially results in B, then unloading B results in A, then unloading A brings it back to the initial state. It also facilitates the modification of logic that affects the currently rendered views. 
