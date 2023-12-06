import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.scss';
import { MdOutlineLightMode, MdOutlineDarkMode, MdMenu } from 'react-icons/md';

export default function Header({ Dark, setDark }) {
	return (
		<header className='Header'>
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
					{/* <button onClick={() => setDark(!Dark)}>theme</button> */}
					<div className={`themeBox ${Dark && 'dark'}`} onClick={() => setDark(!Dark)}>
						{Dark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
					</div>
				</li>
				<li className='tabMob'>
					<MdMenu />
				</li>
			</ul>
		</header>
	);
}
