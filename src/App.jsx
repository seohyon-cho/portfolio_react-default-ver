import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useMedia } from './hooks/useMedia';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import MainWrap from './components/main/MainWrap';
import Department from './components/sub/department/Department';
import Youtube from './components/sub/youtube/Youtube';
import Gallery from './components/sub/gallery/Gallery';
import Community from './components/sub/community/Community';
import Members from './components/sub/members/Members';
import Contact from './components/sub/contact/Contact';
import { useEffect, useState } from 'react';
import Detail from './components/sub/youtube/Detail';
import Menu from './components/common/menu/Menu';

import { useDispatch, useSelector } from 'react-redux';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchHistory } from './redux/historySlice';
import { fetchMember } from './redux/memberSlice';
import { fetchFlickr } from './redux/flickrSlice';

export default function App() {
	const dispatch = useDispatch();
	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchMember());
		dispatch(fetchHistory());
		dispatch(fetchFlickr({ type: 'user', id: '199633413@N04' }));
	}, [dispatch]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header Dark={Dark} setDark={setDark} Toggle={Toggle} setToggle={setToggle} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Footer />
			{Toggle && <Menu setToggle={setToggle} />}
		</div>
	);
}
