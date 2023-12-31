import './MainWrap.scss';
import CookiePopup from '../common/cookiePopup/CookiePopup';
import Visual from './visual/Visual';

export default function MainWrap() {
	return (
		<>
			<CookiePopup />
			<Visual />
		</>
	);
}
