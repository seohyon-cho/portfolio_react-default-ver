import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import Masonry from 'react-masonry-component';
import { LuSearch } from 'react-icons/lu';
import { BsFilterLeft } from 'react-icons/bs';
import { PiArrowDownRightThin } from 'react-icons/pi';
import { TbHomeShare } from 'react-icons/tb';
import Modal from '../../common/modal/Modal';

import { useFlickrQuery } from '../../../hooks/useFlickrQuery';
import { useGlobalData } from '../../../hooks/useGlobalData';

export default function Gallery() {
	const path = useRef(process.env.PUBLIC_URL);
	const myID = useRef('199633413@N04');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);
	const searched = useRef(false);
	const gap = useRef(20);

	const { setModalOpen } = useGlobalData();
	const [Index, setIndex] = useState(0);

	const [Opt, setOpt] = useState({ type: 'user', id: myID.current });
	const { data: Pics, isSuccess } = useFlickrQuery(Opt);

	const customSectionRef = useRef(null);
	const scrollToCustomSection = () => {
		if (customSectionRef.current) {
			customSectionRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const activateBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = e => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		setOpt({ type: 'interest' });
	};
	const handleMine = e => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		setOpt({ type: 'user', id: myID.current });
	};

	const handleUser = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		setOpt({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;

		if (!keyword.trim()) return;
		e.target.children[0].value = '';

		setOpt({ type: 'search', keyword: keyword });
		searched.current = true;
	};

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current);
	}, []);

	return (
		<>
			<Layout category={'HOME / GALLERY'} title={'Gallery'}>
				<div className='Gallery'>
					<section className='visual'>
						<div className='info'>
							<h1>Find The Best Picture Style For You</h1>
							<p>
								We are a full service creative studio specializing in photography, product styling, and creative direction. Discover the world in a
								new way!
							</p>
							<button onClick={scrollToCustomSection}>
								Move Down
								<PiArrowDownRightThin className='arrow' />
							</button>
						</div>
						<div className='pic'>
							<video src={`${path.current}/img/visual3.mp4`} loop autoPlay muted playsInline></video>
						</div>
					</section>
					<section className='controls' ref={customSectionRef}>
						<nav className='btnSet' ref={refNav}>
							<span>
								<BsFilterLeft className='filterIcon' />
								Filter
							</span>
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
							{isSuccess && searched.current && Pics.length === 0 ? (
								<h2>해당 키워드에 대한 검색 결과가 없습니다.</h2>
							) : (
								isSuccess &&
								Pics.map((pic, idx) => {
									return (
										<article key={pic.id}>
											<div
												className='pic'
												onClick={() => {
													setModalOpen(true);
													setIndex(idx);
												}}>
												<div className='picframe'>
													<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
												</div>
												<h2>{pic.title}</h2>
											</div>
											<div className='profile'>
												<img
													src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
													alt='사용자 프로필 이미지'
													onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
												/>
												<span onClick={handleUser}>{pic.owner}</span>
												<TbHomeShare className='arrow' />
											</div>
										</article>
									);
								})
							)}
						</Masonry>
					</section>
				</div>
			</Layout>

			<Modal>
				{isSuccess && Pics.length !== 0 && (
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
	);
}
