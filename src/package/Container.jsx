import React, { useState, useCallback, useMemo, useEffect } from 'react';
import isEmpty from 'lodash.isempty';
import uniqueid from 'lodash.uniqueid';

import { PLACEMENTS, groupNotificationByPlacement, NOTIFICATION_TYPES } from './utils';
import { NotificationsComponenet, NotifyContainer } from './Styles';
import EventEmitter from './EventEmitter';

const NotificationContainer = () => {
	const [notifications, addNotifications] = useState([]);

	const closeNotification = (removeId) => {
		addNotifications((_notification) => {
			return _notification.filter((e) => e?.notificationId !== removeId);
		});
	};
	const formatNotification = (data) => {
		return {
			...data,
			placement: data?.placement || PLACEMENTS.TOP_LEFT,
			notificationId: uniqueid(data?.placement || PLACEMENTS.TOP_LEFT),
		};
	};

	useEffect(() => {
		EventEmitter.subscribe('addNotification', (data) => {
			addNotifications((prev) => [...prev, formatNotification(data)]);
		});
		return () => {
			addNotifications([]);
		};
	}, []);

	const groupedNotifications = useMemo(() => {
		return groupNotificationByPlacement(notifications);
	}, [notifications]);

	const getNotifications = useCallback((notification = [], placement) => {
		if (isEmpty(notification) || isEmpty(placement)) return [];
		if (isEmpty(notification[placement])) return [];
		return notification[placement];
	}, []);

	const placements = Object.values(PLACEMENTS);

	return (
		<>
			{placements.map((placement, placementIndex) => {
				return (
					<React.Fragment key={placementIndex}>
						{!isEmpty(getNotifications(groupedNotifications, placement)) ? (
							<NotificationsComponenet position={placement}>
								{getNotifications(groupedNotifications, placement).map((notification, index) => (
									<Notification
										key={`${notification.placement}_${index}`}
										id={notification?.notificationId}
										message={notification?.message}
										duration={notification?.duration}
										type={notification?.type}
										onClose={closeNotification}
									/>
								))}
							</NotificationsComponenet>
						) : null}
					</React.Fragment>
				);
			})}
		</>
	);
};
export default NotificationContainer;

/**
 * @param {Object} notify
 * @param {string} notify.message
 * @param {string} notify.placement
 * @param {number} notify.duration
 * @param {string} notify.type
 *
 */

export const notify = ({ message, placement, duration, type }) => {
	return EventEmitter.dispatch('addNotification', { message, placement, duration, type });
};

const Notification = ({ message, id, duration = 1500, type = NOTIFICATION_TYPES.info, onClose = () => {} }) => {
	const handleOnClose = useCallback(() => {
		if (onClose) {
			onClose(id);
		}
	}, [id, onClose]);

	useEffect(() => {
		let timer = setTimeout(() => {
			handleOnClose();
		}, duration);
		return () => {
			clearTimeout(timer);
		};
	}, [duration, handleOnClose]);
	return (
		<NotifyContainer type={type}>
			<div className="content">{message}</div>
			<div>
				<button className="close-btn" onClick={handleOnClose}>
					x
				</button>
			</div>
		</NotifyContainer>
	);
};
