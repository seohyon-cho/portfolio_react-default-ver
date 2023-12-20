import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { IoIosCall } from 'react-icons/io';
import { IoLocationSharp, IoChatbubblesSharp } from 'react-icons/io5';
import emailjs from '@emailjs/browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai';

export default function Contact() {
	const [FaqIndex, setFaqIndex] = useState(null);

	// 지도 관련
	const kakao = useRef(window.kakao);
	const [Index, setIndex] = useState(0);
	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const marker = useRef(null);
	const mapInstance = useRef(null);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(true);

	// form Email
	const form = useRef();
	const resetForm = () => {
		const elArr = form.current.elements;
		Array.from(elArr).forEach(el => {
			if (el.name === 'user_name' || el.name === 'user_email' || el.name === 'message') el.value = '';
		});
	};

	const sendEmail = e => {
		e.preventDefault();
		const [user, email] = form.current.querySelectorAll('input');
		const txtArea = form.current.querySelector('textarea');
		if (!user.value || !email.value || !txtArea.value) return alert('모든 항목을 입력해주세요!');

		emailjs.sendForm('service_5hczkfv', 'template_ktwgxvz', form.current, 'upPLj_wKd4_bGkOZ4').then(
			result => {
				alert('문의 내용이 성공적으로 전송되었습니다!');
				resetForm();
			},
			error => {
				alert('일시적인 장애로 문의 전송에 실패하였습니다. 잠시 후 다시 시도해주시기 바랍니다.');
				resetForm();
			}
		);
	};

	// kakao map part
	const roadview = useRef(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	});

	const setCenter = useCallback(() => {
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
		roadview.current();
	}, [Index]);

	const mapInfo = useRef([
		{
			title: 'SEOUL Office',
			address: '50, Apgujeong-ro, Gangnam-gu, Seoul, Republic of Korea',
			tel: '+82 10 1324 3546',
			latlng: new kakao.current.maps.LatLng(37.52535227165237, 127.03564376627601),
			imgSrc: `${process.env.PUBLIC_URL}/img/pin.png`,
			imgSize: new kakao.current.maps.Size(60, 60),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: 'BUSAN Office',
			address: '167, Marine city 1-ro, Haeundae-gu, Busan, Republic of Korea',
			tel: '+82 10 9786 8697',
			latlng: new kakao.current.maps.LatLng(35.147731904188646, 129.1100687388588),
			imgSrc: `${process.env.PUBLIC_URL}/img/pin.png`,
			imgSize: new kakao.current.maps.Size(60, 60),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: 'JEJU Office',
			address: '1floor, 242, Cheomdan-ro, Jeju-si, Jeju-do, Republic of Korea',
			tel: '+82 10 4657 5746',
			latlng: new kakao.current.maps.LatLng(33.450198555072305, 126.5701366730962),
			imgSrc: `${process.env.PUBLIC_URL}/img/pin.png`,
			imgSize: new kakao.current.maps.Size(60, 60),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		}
	]);

	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt)
	});

	// FAQ part
	const faqInfo = useRef([
		{ question: 'What file-format should I submit?', answer: 'This is the answer to the first question, thank you.' },
		{ question: 'What is the 3% under allowance policy?', answer: 'This is the answer to the second question, thank you.' },
		{ question: 'How much do I have to pay to get started?', answer: 'This is the answer to the third question, thank you.' },
		{ question: 'What is your minimum order quantity?', answer: 'This is the answer to the fourth question, thank you.' }
	]);

	useEffect(() => {
		// 지도 중첩 생성 방지 초기화 작업
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, { center: mapInfo.current[Index].latlng, level: 3 });
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(true);
		roadview.current();

		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});

		// 지도 타입 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);
		// 지도 줌 컨트롤러 추가
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		// 마우스 휠에 기본적으로 내장되어 있는 줌 기능 비활성화
		mapInstance.current.setZoomable(false);

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, setCenter]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout category={'HOME / CONTACT'} title={'Contact Us'}>
			<div className='Contact'>
				<section className='visual'>
					<h1>We'd love to hear from you.</h1>
				</section>
				<section className='info'>
					<div className='message'>
						<h3>Send a Message</h3>
						<p>It is very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!</p>
						<form ref={form} onSubmit={sendEmail}>
							<div className='nameSection'>
								<label>Name</label>
								<input type='text' name='user_name' placeholder='Enter your name' />
							</div>
							<div className='emailSection'>
								<label>Email</label>
								<input type='email' name='user_email' placeholder='Enter your Email' />
							</div>
							<div className='messageSection'>
								<label>Message</label>
								<textarea name='message' cols='50' rows='7' />
							</div>
							<input type='submit' value='Send' className='sendBtn' />
						</form>
					</div>
					<div className='detailInfo'>
						<ul className='info'>
							<li>
								<ul className='call'>
									<h4>Call Us</h4>
									<li>
										It is very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!
									</li>
									<li>
										<IoIosCall className='icon' /> <span>+82 1234 10 20 81</span>
									</li>
								</ul>
							</li>
							<li>
								<ul className='visit'>
									<h4>Visit Us</h4>
									<li>
										It is very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!
									</li>
									<li>
										<IoLocationSharp className='icon' /> <span>6A Hampstead High Street</span>
									</li>
								</ul>
							</li>
							<li>
								<ul className='live'>
									<h4>Live Chat</h4>
									<li>
										It is very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!
									</li>
									<li>
										<IoChatbubblesSharp className='icon' /> <span>support@trafficbot.uk</span>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</section>
				<div className='controlBox'>
					<nav className='traffic'>
						<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>
						<button onClick={() => setView(!View)}>{View ? 'ROAD VIEW' : 'MAP'}</button>
						<button onClick={setCenter}>RESET</button>
					</nav>
					<nav className='branch'>
						{mapInfo.current.map((el, idx) => (
							<div key={el + idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
								<h2>{el.title}</h2>
								<p>{el.address}</p>
								<p className='tel'>
									<IoIosCall className='icon' />
									{el.tel}
								</p>
							</div>
						))}
					</nav>
				</div>
				<section className='tab'>
					<article className={`mapBox ${View ? 'on' : ''}`} ref={mapFrame}></article>
					<article className={`viewBox ${View ? '' : 'on'}`} ref={viewFrame}></article>
				</section>
				<section className='question'>
					<article className='left'>
						<p>FAQ</p>
						<h2>Frequently asked questions.</h2>
					</article>
					<article className='right'>
						<h4>
							Here are some common questions about <span>MELLOW</span>.
						</h4>
						<p>Our help center can instantly give you answers to many frequently asked qustions. Here are some common questions about our company.</p>
						<ul className='questionList'>
							{faqInfo.current.map((data, idx) => {
								const showAnswer = idx === FaqIndex;
								return (
									<li key={data + idx} onClick={() => setFaqIndex(showAnswer ? null : idx)} className={showAnswer ? 'expanded' : ''}>
										{data.question}
										{showAnswer ? <AiFillMinusSquare className='icon' /> : <AiFillPlusSquare className='icon' />}
										{showAnswer && <div className='answer'>{data.answer}</div>}
									</li>
								);
							})}
						</ul>
					</article>
				</section>
			</div>
		</Layout>
	);
}
