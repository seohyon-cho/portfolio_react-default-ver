import { useRef } from 'react';

export const useThrottle = (func, gap = 500) => {
	const eventBlocker = useRef(null);

	return () => {
		if (eventBlocker.current) return;

		eventBlocker.current = setTimeout(() => {
			func();
			eventBlocker.current = null;
		}, gap);
	};
};
