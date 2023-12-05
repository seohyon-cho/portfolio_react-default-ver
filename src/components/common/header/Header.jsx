import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.scss';

export default function Header() {
	return (
		<header className='Header'>
			<h1>
				<Link to='/'>LOGO</Link>
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
				<li>
					<NavLink to='/contact' activeClassName={'on'}>
						Contact
					</NavLink>
				</li>
				<li>
					<button>theme</button>
				</li>
			</ul>
		</header>
	);
}
