import isEmpty from 'lodash.isempty';

export const PLACEMENTS = {
	TOP_LEFT: 'TOP_LEFT',
	TOP_RIGHT: 'TOP_RIGHT',
	BOTTOM_LEFT: 'BOTTOM_LEFT',
	BOTTOM_RIGHT: 'BOTTOM_RIGHT',
};

export const groupNotificationByPlacement = (data) => {
	if (isEmpty(data)) {
		return [];
	}
	return data.reduce((previous, current) => {
		previous[current.placement] = previous[current.placement] || [];
		previous[current.placement].push(current);
		return previous;
	}, Object.create(null));
};

export const NOTIFICATION_TYPES = {
	danger: 'danger',
	success: 'success',
	info: 'info',
	warning: 'warning',
};

export const NOTFICATION_BACKGROUND = {
	danger: '#f44336',
	success: '#04AA6D',
	info: '#2196F3',
	warning: '#ff9800',
};
