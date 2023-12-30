import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value, gap = 500) => {
	const [Mounted, setMounted] = useState(true);

	const [DebouncedVal, setDebouncedVal] = useState(value);
	const eventBlocker = useRef(null);

	clearTimeout(eventBlocker.current);

	eventBlocker.current = setTimeout(() => {
		Mounted && setDebouncedVal(value);
	}, gap);

	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return DebouncedVal;
};
