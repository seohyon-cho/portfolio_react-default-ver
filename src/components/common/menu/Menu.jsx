import { useCallback, useEffect } from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline, IoPeopleOutline, IoCallOutline } from 'react-icons/io5';
import { FaRegBuilding } from 'react-icons/fa';
import { MdOndemandVideo, MdChatBubbleOutline } from 'react-icons/md';
import { GrGallery } from 'react-icons/gr';
import { useGlobalData } from '../../../hooks/useGlobalData';

export default function Menu() {
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
			{MenuOpen && (
				<AnimatePresence>
					<motion.aside className='Menu' initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.5 }}>
						<span>
							<IoCloseOutline onClick={() => setMenuOpen(false)} />
						</span>
						<ul onClick={() => setMenuOpen(false)}>
							<NavLink to='/Department'>
								<li>
									<FaRegBuilding />
									<h3>Department</h3>
								</li>
							</NavLink>
							<NavLink to='/Youtube'>
								<li>
									<MdOndemandVideo />
									<h3>Youtube</h3>
								</li>
							</NavLink>
							<NavLink to='/Gallery'>
								<li>
									<GrGallery />
									<h3>Gallery</h3>
								</li>
							</NavLink>
							<NavLink to='/Community'>
								<li>
									<MdChatBubbleOutline />
									<h3>Community</h3>
								</li>
							</NavLink>
							<NavLink to='/Members'>
								<li>
									<IoPeopleOutline />
									<h3>Members</h3>
								</li>
							</NavLink>
							<NavLink to='/Contact'>
								<li>
									<IoCallOutline />
									<h3>Contact</h3>
								</li>
							</NavLink>
						</ul>
						<p>MELLOW</p>
					</motion.aside>
				</AnimatePresence>
			)}
		</>
	);
}
