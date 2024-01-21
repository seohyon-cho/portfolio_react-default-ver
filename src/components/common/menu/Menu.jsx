import { useCallback, useEffect } from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { useGlobalData } from '../../../hooks/useGlobalData';
import { FaCaretRight } from 'react-icons/fa';

export default function Menu() {
	const menuTitle = ['Department', 'Youtube', 'Gallery', 'Community', 'Members', 'Contact'];
	const { MenuOpen, setMenuOpen } = useGlobalData();
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && setMenuOpen(false);
	}, [setMenuOpen]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, [closeMenu]);
	return (
		<>
			<AnimatePresence>
				{MenuOpen && (
					<motion.aside className='Menu' initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.6 }}>
						<div className='top'>
							<h4>MELLOW</h4>
							<IoCloseOutline onClick={() => setMenuOpen(false)} className='close' />
						</div>
						<ul onClick={() => setMenuOpen(false)}>
							{menuTitle.map((el, idx) => {
								return (
									<NavLink to={`/${el}`}>
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
		</>
	);
}
