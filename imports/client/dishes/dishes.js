import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Random } from 'meteor/random';
import dishes from '/imports/lib/collections/dishes.js'

import './dishes.html';
import './dishes.css';

Template.dishes.onCreated(function dishesOnCreated() {
	const self = this;
	self.autorun(function () {
		self.subscribe('dishes');
	});
});

Template.dishes.helpers({
  dishes() {
    return dishes.find();
  },
});

Template.dishes.events({
  'click .insertdish'(event, instance) {
    dishes.insert({originalTitle:'randTitle-'+Random.id()}, function (error,result) {
    	if (error) {
    		const err = error.message || error;
    		console.log('dish insert error: ',err);
    		alert(err);
    	}
    });
  },
  'click .updatedish'(event, instance) {
    dishes.update({_id: this._id}, {$set:{originalTitle:'randUpdatedTitle-'+Random.id()}}, function (error,result) {
    	if (error) {
    		const err = error.message || error;
    		console.log('dish update error: ',err);
    		alert(err);
    	}
    });
  },
   'click .removedish'(event, instance) {
    dishes.remove({_id: this._id}, function (error,result) {
    	if (error) {
    		const err = error.message || error;
    		console.log('dish remove error: ',err);
    		alert(err);
    	}
    });
  },
});
