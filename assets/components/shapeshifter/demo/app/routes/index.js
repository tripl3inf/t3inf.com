var cachedUsers = null;

function getUsers() {
	var i, calls = [];
	for(i = 0; i < 3; i++) {
		calls.push(new Ember.RSVP.Promise(function(resolve, reject) {
			Ember.$.ajax({
				type: 'get',
				url: 'http://api.randomuser.me/',
				data: {
					seed: Math.floor(Math.random() * Math.pow(2, 16)),
					results: 4
				}
			}).done(function(json) {
				resolve(Ember.A(json.results).map(function(result) {
					return result.user;
				}));
			}).fail(reject);
		}));
	}
	return Ember.RSVP.all(calls).then(function(responses) {
		var users = [];
		Ember.A(responses).forEach(function(response) {
			response.forEach(function(user) {
				user.isSpied = false;
				user.isDead = false;
				users.push(user);
			});
		});
		cachedUsers = users;
		return users;
	});
}

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return cachedUsers ? cachedUsers : getUsers();
	}
});
