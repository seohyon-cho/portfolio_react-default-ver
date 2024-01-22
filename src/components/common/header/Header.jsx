import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.scss';
import { MdOutlineLightMode, MdOutlineDarkMode, MdMenu } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';
import { useScroll } from '../../../hooks/useScroll';
import { useEffect, useRef } from 'react';

export default function Header() {
	const refHeader = useRef(null);
	const { Frame } = useScroll();

	const scrollDown = e => {
		e.deltaY > 0 ? refHeader.current.classList.add('scrollDown') : refHeader.current.classList.remove('scrollDown');
	};

	useEffect(() => {
		Frame?.addEventListener('mousewheel', scrollDown);
		return () => {
			Frame?.removeEventListener('mousewheel', scrollDown);
		};
	}, [Frame]);

	const dispatch = useDispatch();
	const { menuReducer, darkReducer } = useSelector(store => store);
	const Open = menuReducer.menu;
	const Dark = darkReducer.dark;

	return (
		<header className={`Header`} ref={refHeader}>
			<h1>
				<Link to='/'>MELLOW</Link>
			</h1>
			<ul className='centerNav'>
				<li>
					<NavLink to='/department' activeClassName={'on'}>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName={'on'}>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName={'on'}>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeClassName={'on'}>
						Community
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName={'on'}>
						Members
					</NavLink>
				</li>
			</ul>
			<ul className='subNav'>
				<li className='contact'>
					<NavLink to='/contact' activeClassName={'on'}>
						Contact
					</NavLink>
				</li>
				<li>
					<div className={`themeBox ${Dark && 'dark'}`} onClick={() => dispatch({ type: types.DARK.start, payload: !Dark })}>
						{Dark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
					</div>
				</li>
				<li className='tabMob' onClick={() => dispatch({ type: types.MENU.start, payload: !Open })}>
					<MdMenu />
				</li>
			</ul>
		</header>
	);
}
