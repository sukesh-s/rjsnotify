# rjsnotify 🎉

## A simple react notification component. ✨

## Install

```
$ npm install rjsnotify
```

## Usage

```
import Notification, { notify } from 'rjsnotify';

const App = () => {
	const showNotification = () => {
		notify({ message: 'Hello world', placement: 'TOP_RIGHT', type: 'info' });
	};

	return (
		<div>
			<Notification />
			<button onClick={showNotification}>notfiy</button>
		</div>
	);
};

```

## API

## notify props

| Name       | Type   | Default    | Required |
| ---------- | ------ | ---------- | -------- |
| message    | string |            | true     |
| placements | string | "TOP_LEFT" | false    |
| duration   | number | 1500       | false    |
| type       | string |            | false    |

## placements

-   TOP_LEFT
-   TOP_RIGHT
-   BOTTOM_LEFT
-   BOTTOM_RIGHT

## types

-   danger
-   success
-   info
-   warning

## Pending features 🚧

-   CSS transitions
-   Rendering custom elements
-   Pause on hover

## Contribute 🧑‍💻

Clone this repository make a pull request to `develop` branch

MIT ❤️
