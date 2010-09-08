var Observable = {
	subscribe: function(event, callback) {
		this.observers = this.observers || {};
		this.observers[event] = this.observers[event] || [];
		this.observers[event].push(callback);
	},
	notify: function() {
		if(this.observers) {
			var event = arguments[0];
			var observers = this.observers[event];
			if(observers) {
				var passing_arguments = this.argumentsToArray(arguments, 1);
				jQuery.each(observers, function(i, observer) {
					observer.apply(null, passing_arguments);
				});
			}
		}
	},
	bubble: function() {
		var self = this;
		var observable = arguments[0];
		jQuery.each(this.argumentsToArray(arguments, 1), function(index, event) {
			observable.subscribe(event, function() {
				var args_array = self.argumentsToArray(arguments);
				args_array.unshift(event);
				self.notify.apply(self, args_array);
			});
		});
	},
	argumentsToArray: function(args, start_from) {
		var array = [];
		for(var i=(start_from || 0); args.length>i; i++) {
			array.push(args[i]);
		}
		return array;
	}
};
