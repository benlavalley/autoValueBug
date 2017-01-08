import { Meteor } from 'meteor/meteor';
import dishes from '/imports/lib/collections/dishes.js'

dishes.allow({
	insert(userId, doc) {
		console.log('dishes insert from user "',userId,'"" to doc :',doc);
		return true;
	},
	update(userId, doc, fields, modifier) {
		console.log('dishes update from user "',userId,'"" to doc :',doc,' || modifier is :',modifier);	
		return true;
	},
	remove(userId, doc) {
		console.log('dishes remove from user "',userId,'"" on doc :',doc);	
		return true;
	},
});

Meteor.publish('dishes', function () {
	return dishes.find();
});