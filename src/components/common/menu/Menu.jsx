import { useCallback, useEffect } from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { AnimatePresence, motion } from 'framer-motion';
import { IoCloseOutline, IoPeopleOutline, IoCallOutline } from 'react-icons/io5';
import { FaRegBuilding } from 'react-icons/fa';
import { MdOndemandVideo, MdChatBubbleOutline } from 'react-icons/md';
import { GrGallery } from 'react-icons/gr';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Menu() {
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
		<>
			{Open && (
				<AnimatePresence>
					<motion.aside className='Menu' initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.7 }}>
						<span>
							<IoCloseOutline onClick={() => dispatch({ type: types.MENU.start, payload: false })} />
						</span>
						<ul onClick={() => dispatch({ type: types.MENU.start, payload: false })}>
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
