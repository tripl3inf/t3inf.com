App.Shapeshifter.register('strike', function() {
	this.extend('component:strike-user', {
		templateName: 'addons/strike-user',
		classNames: ['strike-user'],
		actions: {
			toggleStrike: function() {
				this.set('user.isDead', !this.get('user.isDead'));
			}
		}
	});
});
