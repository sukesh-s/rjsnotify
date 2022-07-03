import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import App from './App';

test('render Notification container', async () => {
	render(<App />);
	const topLeft = screen.getByTestId('TOP_RIGHT_btn');
	fireEvent.click(topLeft);

	const { getByTestId } = within(screen.getByTestId('TOP_RIGHT-container'));
	const notifiedItem = getByTestId('TOP_RIGHT_0');
	expect(notifiedItem).toBeInTheDocument();
	await waitFor(() => expect(notifiedItem).not.toBeInTheDocument(), { timeout: 1500 }); // gets error becoz element is not found
});
