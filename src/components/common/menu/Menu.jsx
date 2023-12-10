import { useEffect } from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { IoCloseOutline, IoPeopleOutline, IoCallOutline } from 'react-icons/io5';
import { FaRegBuilding } from 'react-icons/fa';
import { MdOndemandVideo, MdChatBubbleOutline } from 'react-icons/md';
import { GrGallery } from 'react-icons/gr';

export default function Menu({ setToggle }) {
	const closeMenu = () => {
		window.innerWidth >= 1000 && setToggle(false);
	};

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, []);
	return (
		<aside className='Menu'>
			<span>
				<IoCloseOutline onClick={() => setToggle(false)} />
			</span>
			<ul onClick={() => setToggle(false)}>
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
		</aside>
	);
}
