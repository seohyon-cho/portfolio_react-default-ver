import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.scss';
import { MdMenu } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';
import { useScroll } from '../../../hooks/useScroll';
import { useEffect, useRef } from 'react';
import DarkMode from '../darkMode/DarkMode';
import { useCustomText } from '../../../hooks/useText';

export default function Header({ type }) {
	const upperChange = useCustomText('combined');
	const centerNav = ['department', 'youtube', 'gallery', 'community', 'members'];

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
	const { menuReducer } = useSelector(store => store);
	const Open = menuReducer.menu;

	return (
		<header className={`Header ${type}`} ref={refHeader}>
			<h1>
				<Link to='/'>MELLOW</Link>
			</h1>
			<ul className='centerNav'>
				{centerNav.map((el, idx) => (
					<li key={el + idx}>
						<NavLink to={`/${el}`} activeClassName={'on'}>
							{upperChange(el)}
						</NavLink>
					</li>
				))}
			</ul>
			<ul className='subNav'>
				<li className='contact'>
					<NavLink to='/contact' activeClassName={'on'}>
						Contact
					</NavLink>
				</li>
				<li>
					<DarkMode />
				</li>
				<li className='tabMob' onClick={() => dispatch({ type: types.MENU.start, payload: !Open })}>
					<MdMenu />
				</li>
			</ul>
		</header>
	);
}
