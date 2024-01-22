import { useCallback, useEffect } from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { FaCaretRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Menu() {
	const menuTitle = ['Department', 'Youtube', 'Gallery', 'Community', 'Members', 'Contact'];
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menuReducer.menu);

	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch({ type: types.MENU.start, payload: false });
	}, [dispatch]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, [closeMenu]);

	return (
		<AnimatePresence>
			{Open && (
				<motion.aside className='Menu' initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.6 }}>
					<div className='top'>
						<h4>MELLOW</h4>
						<IoCloseOutline onClick={() => dispatch({ type: types.MENU.start, payload: false })} className='close' />
					</div>
					<ul onClick={() => dispatch({ type: types.MENU.start, payload: false })}>
						{menuTitle.map((el, idx) => {
							return (
								<NavLink to={`/${el}`} key={el + idx}>
									<li>
										<h3>{el}</h3>
										<FaCaretRight className='arrow' />
									</li>
								</NavLink>
							);
						})}
					</ul>
					<p>MELLOW</p>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
