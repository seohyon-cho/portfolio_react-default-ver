import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { IoIosCall } from 'react-icons/io';
import { IoLocationSharp, IoChatbubblesSharp } from 'react-icons/io5';
import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState } from 'react';
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai';

export default function Contact() {
	const [FaqIndex, setFaqIndex] = useState(null);

	const kakao = useRef(window.kakao);
	const [Index, setIndex] = useState(1);
	const mapFrame = useRef(null);
	const marker = useRef(null);
	const mapInstance = useRef(null);

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
	const setCenter = () => mapInstance.current.setCenter(mapInfo.current[Index].latlng);

	const mapInfo = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.current.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/pin.png`,
			imgSize: new kakao.current.maps.Size(60, 60),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.current.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/pin.png`,
			imgSize: new kakao.current.maps.Size(60, 60),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '서울 시청',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
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
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, { center: mapInfo.current[Index].latlng, level: 3 });
		marker.current.setMap(mapInstance.current);

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

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
				<div className='map' ref={mapFrame}></div>
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
							{/* <li
								onClick={() => {
									setAnswer(!Answer);
								}}>
								What file-format should I submit? <BsFillPlusSquareFill className='icon' />
								{Answer && (
									<div className='answer' Answer={Answer} setAnswer={setAnswer}>
										this is answer
									</div>
								)}
							</li> */}
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
							{/* <li
								onClick={() => {
									setAnswer(!Answer);
								}}>
								What is the 3% under allowance policy?
								<BsFillPlusSquareFill className='icon' />
								{Answer && (
									<div className='answer' Answer={Answer} setAnswer={setAnswer}>
										this is answer
									</div>
								)}
							</li>
							<li
								onClick={() => {
									setAnswer(!Answer);
								}}>
								How much do I have to pay to get started?
								<BsFillPlusSquareFill className='icon' />
								{Answer && (
									<div className='answer' Answer={Answer} setAnswer={setAnswer}>
										this is answer
									</div>
								)}
							</li>
							<li
								onClick={() => {
									setAnswer(!Answer);
								}}>
								What is your minimum order quantity?
								<BsFillPlusSquareFill className='icon' />
								{Answer && (
									<div className='answer' Answer={Answer} setAnswer={setAnswer}>
										this is answer
									</div>
								)}
							</li> */}
						</ul>
					</article>
				</section>
			</div>
		</Layout>
	);
}
