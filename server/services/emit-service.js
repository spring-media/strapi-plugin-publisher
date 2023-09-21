'use strict';

const strapiUtils = require('@strapi/utils');

const ENTRY_PUBLISH = 'entry.publish';
const ENTRY_UNPUBLISH = 'entry.unpublish';

module.exports = ({ strapi }) => ({
	async emit(event, uid, entity) {
		const model = strapi.getModel(uid);
		const sanitizedEntity = await strapiUtils.sanitize.sanitizers.defaultSanitizeOutput(
			model,
			entity
		);

		strapi.eventHub.emit(event, {
			model: model.modelName,
			entry: sanitizedEntity,
		});
	},

	async publish(uid, entity) {
		await this.emit(ENTRY_PUBLISH, uid, entity);
	},

	async unpublish(uid, entity) {
		await this.emit(ENTRY_UNPUBLISH, uid, entity);
	},
});
