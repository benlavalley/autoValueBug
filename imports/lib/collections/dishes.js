import { Mongo } from 'meteor/mongo';
import 'babel-polyfill';
import SimpleSchema from 'simpl-schema';

SimpleSchema.debug = true;

const dishesSchema = new SimpleSchema({
	createdAt: {
		type: Date,
		denyUpdate: true,
		autoValue() {
			if (this.isInsert) {
				return new Date();
			}
		}
	},
	originalTitle: {
		type: String,
		label: 'Title',
		max: 80,
		optional: true,
	},
	titleUpdatesHistory: {
		type: Array,
		optional: true,
		autoValue() {
			const content = this.field('originalTitle');
				if (content.isSet) {
					if (this.isInsert) {
						return [{
							date: new Date(),
							content: content.value,
						}];
					} else {
						return {
							$push: { date: new Date(), content: content.value },
						};
					}
				} else {
					this.unset();
				}
		},
	},
	'titleUpdatesHistory.$': {
		type: Object,
	},
	'titleUpdatesHistory.$.date': {
		type: Date,
		optional: true,
	},
	'titleUpdatesHistory.$.content': {
		type: String,
		optional: true,
	},
});
const dishes = new Mongo.Collection('dishes');
dishes.attachSchema(dishesSchema);

export default dishes;
