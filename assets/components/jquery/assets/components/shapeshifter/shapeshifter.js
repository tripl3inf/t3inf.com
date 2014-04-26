(function() {

  if(typeof Ember === 'undefined') {
    throw new Error('The Shapeshifter library must be included after Ember.');
  }

  var shapeshifter;

  /**
    Shapeshifter.load is called within this context.
  */

  function fnContext(container, application) {
    return {

      container: container,

      _rewindState: shapeshifter.get('_rewindState.lastObject'),
      _currentState: shapeshifter.get('_currentState.lastObject'),

      /**
        Extend a thing that already exists. Currently only
        supports templates, controllers, view, and components.

        @param {String} identifier the name of the thing in ember's container string format, i.e. 'type:foo-bar'
        @param {Function|Object} change
      */
      extend: function(identifier, change) {
        var arr = identifier.split(':');
        var type = arr[0];
        var name = arr[1];
        var thing = this.container.lookup(identifier);
        var state = {}, key;

        if(typeof change === 'object') {
          for (key in change) {
            state[key] = thing._def[key];
          }
          this._rewindState[identifier] = state;
        } else {
          this._rewindState[identifier] = thing;
        }
        this._currentState[identifier] = change;

        if (type === 'template') {
          this.container.cache.set(identifier, change);
        } else if (type === 'controller') {
          thing.reopen(change);
        } else if (type === 'view' || type === 'component') {
          var Class = application[name.classify() + type.capitalize()];
          Class.reopen(change);
        }
      },

    };
  }

  Ember.Application.initializer({

    name: 'shapeshifter',

    initialize: function(container, application) {

      // part of a hack for forcing rerender
      application.Router.map(function() {
        this.route('shapeshifter', { path: '/shapeshifter' });
      });

      application.Shapeshifter = shapeshifter = Ember.Namespace.create({

        TEMPLATES: {},

        // cache changes here
        _registered: Ember.A(),
        _active: Ember.A(),
        _currentState: Ember.A(),
        _rewindState: Ember.A(),
        _loadQueue: Ember.A(),

        /**
          Register changes.

          @param {String} name
          @param {Function} fn
          @return this
         */
        register: function(name, fn) {
          var change = this.get('_registered').find(function(change) {
            return change.name === name;
          });

          if (this.get('_registered').indexOf(change) >= 0) {
            Ember.Logger.warn('The change "' + name + '" was already registered.');
            return this;
          }

          var hash = {
            name: name,
            load: fn
          };

          this.get('_registered').pushObject(hash);
          if(this.get('_loadQueue').indexOf(name) >= 0) {
            this.load(name);
            this.set('_loadQueue', this.get('_loadQueue').without(name));
          }
          return this;
        },

        /**
          Check if a change is loaded or not.

          @param {String} name
          @return {Boolean}
         */
        isLoaded: function(name) {
          var change = this.get('_active').find(function(change) {
            return change.name === name;
          });
          var isQueued = this.get('_loadQueue').indexOf(name) >= 0;
          return change || isQueued ? true : false;
        },

        /**
          Check if a change is registered or not.

          @param {String} name
          @return {Boolean}
         */
        isRegistered: function(name) {
          var change = this.get('_registered').find(function(change) {
            return change.name === name;
          });
          return change ? true : false;
        },

        /**
          Load a change by name.

          @param {String} name
          @param {Boolean} skip for private use
          @return this
         */
        load: function(name, skip) {
          var change = this.get('_registered').find(function(change) {
            return change.name === name;
          });

          if (change && this.get('_active').indexOf(change) >= 0) {
            Ember.Logger.warn('The change "' + name + '" was already loaded.');
            return this;
          } else if(!change) {
            this.get('_loadQueue').pushObject(name);
            return this;
          } else if(this.get('_loadQueue').indexOf(name) >= 0) {
            this.set('_loadQueue', this.get('_loadQueue').without(name));
          }

          this.get('_rewindState').pushObject({});
          this.get('_currentState').pushObject({});
          this.get('_active').pushObject(change);
          change.load.call(fnContext(container, application));
          if(!skip) this._rerender();
          return this;
        },

        /**
          Unload a change, either by name, or by last one loaded.

          @param {String} [name]
          @return this
         */
        unload: function(name) {
          var change = name ? this.get('_active').find(function(change) {
            return change.name === name;
          }) : this.get('_active.lastObject');

          if(this.get('_loadQueue').indexOf(name) >= 0) {
            this.set('_loadQueue', this.get('_loadQueue').without(name));
            return this;
          }

          if (typeof change !== 'object') {
            Ember.Logger.warn('The change "' + name + '" was not loaded.');
            return this;
          }

          var i, index = this.get('_active').indexOf(change);
          var active = this.get('_active').map(function(change) {
            return change.name;
          });

          for (i = 0; i < active.length - index; i++) {
            this._unload();
          }
          for (i = index + 1; i < active.length; i++) {
            this.load(active[i], true);
          }
          this._rerender();
          return this;
        },

        /**
          Unload the last loaded change.

          @api private
         */
        _unload: function() {
          var state = this.get('_rewindState.lastObject');

          for (var key in state) {
            var arr = key.split(':');
            var type = arr[0];
            var name = arr[1];

            if (type === 'template') {
              container.cache.set(key, state[key]);
            } else if (type === 'controller') {
              container.lookup('controller:' + name).reopen(state[key]);
            } else if (type === 'view') {
              application[name.classify() + 'View'].reopen(state[key]);
            } else if (type === 'component') {
              application[name.classify() + 'Component'].reopen(state[key]);
            }
          }

          this.get('_rewindState').popObject();
          this.get('_currentState').popObject();
          this.get('_active').popObject();
        },

        /**
          Rerender the application view. This currently doesn't work right
          due to a bug in Ember: https://github.com/emberjs/ember.js/issues/2267

          @api private
         */
        _rerender: function() {
          //container.lookup('router:main')._activeViews.application[0].rerender();
          container.lookup('router:main').transitionTo('shapeshifter');
          Ember.run.next(function() {
            window.history.back();
          });
        }

      });

    }

  });

  /**
    Hacks!!
    Explanation: in order to roll back the application state, it needs to
    know what the initial state was. In order to do that, the object definitions
    need to be saved.
   */

  function patchExtend() {
    var _this = this, arg, i;

    for(i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      if (!(arg instanceof Ember.Mixin) && !arg.container) {
        var hash = Ember.$.extend(true, {}, arg);
        arg._setDefinition = function() {
          this._def = hash;
        }.on('init');
      }
    }

    return this._super.apply(this, arguments);
  }

  Ember.Controller.reopenClass({ extend: patchExtend });
  Ember.ArrayController.reopenClass({ extend: patchExtend });
  Ember.ObjectController.reopenClass({ extend: patchExtend });
  Ember.View.reopenClass({ extend: patchExtend });
  Ember.Component.reopenClass({ extend: patchExtend });

}).call(this);
