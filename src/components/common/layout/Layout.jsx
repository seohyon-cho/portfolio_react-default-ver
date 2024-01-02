import { useEffect, useRef } from 'react';
import './Layout.scss';
import useSplitText from '../../../hooks/useText';

export default function Layout({ children, title, category }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current?.classList.add('on');
		}, 300);
	}, [splitText, title]);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<div ref={refFrame} className='tit'>
				<h2 ref={refTitle}>{category}</h2>
				<h1 ref={refTitle}>{title}</h1>
			</div>
			<div ref={refFrame} className='bgImage'></div>
			{children}
		</main>
	);
}
