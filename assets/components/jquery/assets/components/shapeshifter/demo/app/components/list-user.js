App.ListUserComponent = Ember.Component.extend({

	classNames: ['user'],
	classNameBindings: ['user.isSpied:spied', 'user.isDead:dead'],

	fullName: function() {
		return this.get('user.name.first') + ' ' + this.get('user.name.last');
	}.property('user.name.first', 'user.name.last')

});
