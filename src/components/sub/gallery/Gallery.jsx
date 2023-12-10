import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { LuSearch } from 'react-icons/lu';
import { useMedia } from '../../../hooks/useMedia';
import Modal from '../../common/modal/Modal';

export default function Gallery() {
	const myID = useRef('199633413@N04');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);
	const searched = useRef(false);
	const gap = useRef(20);
	const [Pics, setPics] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	const openModal = (e) => {
		setOpen(true);
	};

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};
	const handleMine = (e) => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};

	const handleUser = (e) => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = (e) => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;

		if (!keyword.trim()) return;
		e.target.children[0].value = '';

		fetchFlickr({ type: 'search', keyword: keyword });
		searched.current = true;
	};

	const fetchFlickr = async (opt) => {
		const num = 20;
		const flickr_api = '9714d0fe77bde97690ff70f0d88f4d40';
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		let url = '';

		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		opt.type === 'search' && (url = searchURL);

		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myID.current });
		refFrameWrap.current.style.setProperty('--gap', gap.current);
	}, []);

	return (
		<>
			<Layout category={'HOME / GALLERY'} title={'Gallery'}>
				<div className='Gallery'>
					<section className='controls'>
						<nav className='btnSet' ref={refNav}>
							<button onClick={handleInterest}>Interest Gallery</button>
							<button className='on' onClick={handleMine}>
								My Gallery
							</button>
						</nav>
						<form onSubmit={handleSearch}>
							<input type='text' placeholder='Search' />
							<button className='btnSearch'>
								<LuSearch />
							</button>
						</form>
					</section>
					<section className='frameWrap' ref={refFrameWrap}>
						<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
							{searched.current && Pics.length === 0 ? (
								<h2>해당 키워드에 대한 검색 결과가 없습니다.</h2>
							) : (
								Pics.map((pic, idx) => {
									return (
										<article key={pic.id}>
											<div
												className='pic'
												onClick={() => {
													setOpen(true);
													setIndex(idx);
												}}
											>
												<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
											</div>
											<div className='profile'>
												<img
													src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
													alt='사용자 프로필 이미지'
													onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
												/>
												<span onClick={handleUser}>{pic.owner}</span>
											</div>
											<h2>{pic.title}</h2>
										</article>
									);
								})
							)}
						</Masonry>
					</section>
				</div>
			</Layout>
			{Open && (
				<Modal Open={Open} setOpen={setOpen}>
					{Pics.length !== 0 && (
						<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
					)}
				</Modal>
			)}
		</>
	);
}
