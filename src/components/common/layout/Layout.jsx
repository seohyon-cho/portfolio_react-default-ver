import { useEffect, useRef } from 'react';
import './Layout.scss';
import useSplitText from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout({ children, title, category }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();

	const { scrollTo, refEl } = useScroll();

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refEl.current?.classList.add('on');
		}, 300);
	}, [splitText, title, refEl]);

	useEffect(() => {
		scrollTo(0);
	}, [scrollTo]);

	return (
		<main ref={refEl} className={`Layout ${title}`}>
			<div ref={refEl} className='tit'>
				<h2 ref={refTitle}>{category}</h2>
				<h1 ref={refTitle}>{title}</h1>
			</div>
			<div ref={refFrame} className='bgImage'></div>
			{children}
		</main>
	);
}
