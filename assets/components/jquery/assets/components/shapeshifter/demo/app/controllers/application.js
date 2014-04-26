App.ApplicationController = Ember.Controller.extend({

	isSpying: false,
	isStriking: false,

	actions: {
		toggleSpying: function() {
			var isSpying = this.get('isSpying');
			this.set('isSpying', !isSpying);
		},
		toggleStriking: function() {
			var isStriking = this.get('isStriking');
			this.set('isStriking', !isStriking);
		}
	},

	watchSpy: function() {
		var addon = {
			name: 'spy',
			path: 'dist/addons/spy.js'
		};
		if(this.get('isSpying')) {
			App.Shapeshifter.load(addon.name);
		} else {
			App.Shapeshifter.unload(addon.name);
		}
		if(!App.Shapeshifter.isRegistered(addon.name)) {
			this._appendScript(addon.path);
		}
	}.observes('isSpying'),

	watchStrike: function() {
		var addon = {
			name: 'strike',
			path: 'dist/addons/strike.js'
		};
		if(this.get('isStriking')) {
			App.Shapeshifter.load(addon.name);
		} else {
			App.Shapeshifter.unload(addon.name);
		}
		if(!App.Shapeshifter.isRegistered(addon.name)) {
			this._appendScript(addon.path);
		}
	}.observes('isStriking'),

	_appendScript: function(path) {
		Ember.$.getScript(path);
	}

});
