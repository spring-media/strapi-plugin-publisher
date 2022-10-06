import React from 'react';
import { useParams } from 'react-router-dom';
import _get from 'lodash/get';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Box } from '@strapi/design-system/Box';
import { ActionLayoutHeader } from './ActionLayoutHeader';
import { Action } from '../Action';

const ActionLayout = () => {
	const {
		hasDraftAndPublish,
		isCreatingEntry,
		initialData: { slug, publishedAt },
	} = useCMEditViewDataManager();
	const params = useParams();
	const id = _get(params, 'id', null);
	const currentEntityId = Number(id);
	const isMainOfferPage = slug === '/';
	const pageAlreadyPublished = publishedAt !== null;

	if (!hasDraftAndPublish || isCreatingEntry || isMainOfferPage) {
		return null;
	}
	const actionModes = () => {
		let actionModes = ['publish', 'unpublish'];
		if (pageAlreadyPublished) {
			actionModes = ['unpublish'];
		}
		return actionModes;
	};
	return (
		<Box marginTop={4}>
			<ActionLayoutHeader />
			{actionModes().map((m, index) => (
				<Action mode={m} key={index} entitySlug={slug} entityId={currentEntityId} />
			))}
		</Box>
	);
};
export { ActionLayout };
