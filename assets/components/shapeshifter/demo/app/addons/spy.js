App.Shapeshifter.register('spy', function() {
	this.extend('component:spy-user', {
		templateName: 'addons/spy-user',
		classNames: ['spy-user'],
		actions: {
			toggleSpy: function() {
				this.set('user.isSpied', !this.get('user.isSpied'));
			}
		}
	});
});
