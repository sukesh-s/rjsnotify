import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
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
			type: data?.type || NOTIFICATION_TYPES.info,
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
	const closeTimerRef = useRef(null);
	const notfyContainerRef = useRef();

	const handleCloseTimer = useCallback(
		(_duration) => {
			if (_duration === null) {
				return;
			}
			clearTimeout(closeTimerRef.current);

			closeTimerRef.current = setTimeout(() => {
				onClose(id);
			}, _duration);
		},
		[id, onClose]
	);

	const handlePause = () => {
		clearTimeout(closeTimerRef.current);
	};

	const handleResume = useCallback(() => {
		handleCloseTimer(duration ? duration * 0.5 : null);
	}, [duration, handleCloseTimer]);

	const handleOnClose = useCallback(() => {
		if (onClose) {
			onClose(id);
		}
	}, [id, onClose]);

	useEffect(() => {
		const element = notfyContainerRef.current;
		element.addEventListener('mouseenter', handlePause);
		element.addEventListener('mouseleave', handleResume);
	}, [handleResume, id]);

	useEffect(() => {
		if (duration && closeTimerRef.current) {
			handleCloseTimer(duration);
		}
	}, [duration, handleCloseTimer]);

	return (
		<NotifyContainer type={type} ref={notfyContainerRef}>
			<div className="content">{message}</div>
			<div>
				<button className="close-btn" onClick={handleOnClose}>
					x
				</button>
			</div>
		</NotifyContainer>
	);
};
