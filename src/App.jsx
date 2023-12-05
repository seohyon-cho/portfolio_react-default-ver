import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useMedia } from './hooks/useMedia';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Department from './components/sub/department/Department';
import Youtube from './components/sub/youtube/Youtube';
import Gallery from './components/sub/gallery/Gallery';
import Community from './components/sub/community/Community';
import Members from './components/sub/members/Members';
import Contact from './components/sub/contact/Contact';

export default function App() {
	return (
		<div className={`wrap ${useMedia()}`}>
			<Header />
			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Footer />
		</div>
	);
}
