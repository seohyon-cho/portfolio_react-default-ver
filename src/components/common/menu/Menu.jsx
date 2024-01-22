import { useCallback, useEffect } from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { FaCaretRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { menuClose } from '../../../redux/menuSlice';

export default function Menu({ setToggle }) {
	const menuTitle = ['Department', 'Youtube', 'Gallery', 'Community', 'Members', 'Contact'];
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menu.open);

	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch(menuClose());
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
						<IoCloseOutline onClick={() => dispatch(menuClose())} className='close' />
					</div>
					<ul onClick={() => dispatch(menuClose())}>
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
