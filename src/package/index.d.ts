export type placements = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT';
export type notificationTypes = 'danger' | 'success' | 'info' | 'warning';
export interface notifyParams {
	message: string;
	placement?: placements;
	duration?: number;
	type?: notificationTypes;
}
export function notify(params: notifyParams): void;
export default function Notification(): JSX.Element;
