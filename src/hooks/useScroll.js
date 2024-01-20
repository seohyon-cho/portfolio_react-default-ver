import Anime from '../asset/anime';
import { useState, useEffect, useRef, useCallback } from 'react';

export function useScroll(customHandler, baseLine = -window.innerHeight / 2) {
	const refEl = useRef(null);
	const [Frame, setFrame] = useState(null);

	const scrollTo = useCallback(
		targetPos => {
			console.log(targetPos);
			Frame && new Anime(Frame, { scroll: targetPos });
		},
		[Frame]
	);

	const getCurrentScroll = useCallback(() => {
		const scroll = Frame.scrollTop - baseLine;
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	}, [Frame, baseLine]);

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll();
		customHandler && customHandler(scroll);
	}, [getCurrentScroll, customHandler]);

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	useEffect(() => {
		customHandler && Frame?.addEventListener('scroll', handleScroll);
		return () => customHandler && Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll, customHandler]);

	return { scrollTo, getCurrentScroll, Frame, refEl };
}
