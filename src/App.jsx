import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { Route, Switch } from 'react-router-dom';
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
import { useEffect } from 'react';
import Detail from './components/sub/youtube/Detail';
import Menu from './components/common/menu/Menu';

import { useDispatch, useSelector } from 'react-redux';
import ThemeControl from './components/common/themeControl/ThemeControl';

export default function App({ api }) {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.dark.isDark);

	useEffect(() => {
		api.forEach(func => dispatch(func()));
	}, [dispatch, api]);

	return (
		<div className={`wrap ${Dark ? 'dark' : 'light'} ${useMedia()}`}>
			<Switch>
				<Route exact path='/' component={MainWrap} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>
			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Footer />
			<Menu />
			<ThemeControl />
		</div>
	);
}
