import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { IoIosMail, IoLogoInstagram, IoLogoFacebook } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMember } from '../../../redux/memberSlice';

export default function Department() {
	const dispatch = useDispatch();
	const MemberData = useSelector(store => store.member.data);
	const HistoryData = useSelector(store => store.history.data);
	const path = useRef(process.env.PUBLIC_URL);
	const [SelectedCategory, setSelectedCategory] = useState('Designer');

	useEffect(() => {
		dispatch(fetchMember());
	}, [dispatch]);

	return (
		<Layout category={'HOME / DEPARTMENT'} title={'Who we are'}>
			<div className='Department'>
				<section className='topCont'>
					<div className='imgBox'>
						<div className='person1'>
							<div className='img'>
								<img src={`${path.current}/img/member1.jpg`} alt='member2' />
							</div>
							<div className='comment'>
								<p className='caption1'>John Anderson</p>
								<p className='caption2'>President</p>
							</div>
						</div>
						<div className='person2'>
							<div className='img'>
								<img src={`${path.current}/img/member2.jpg`} alt='member4' />
							</div>
							<div className='comment'>
								<p className='caption1'>Fabian Alexander</p>
								<p className='caption2'>Vice President</p>
							</div>
						</div>
					</div>
					<div className='textBox'>
						<h2>History</h2>
						<div className='con'>
							{HistoryData.map((history, idx) => {
								return (
									<article key={history + idx}>
										<h3>{Object.keys(history)[0]}</h3>
										<ul>
											{Object.values(history)[0].map((list, idx) => {
												return <li key={list + idx}>{list}</li>;
											})}
										</ul>
									</article>
								);
							})}
						</div>
					</div>
				</section>
				<section className='bottomCont'>
					<ul className='memberCategory'>
						<li>
							<h2
								style={{ opacity: SelectedCategory === 'Designer' ? 0.8 : 0.3 }}
								onClick={() => {
									setSelectedCategory('Designer');
									dispatch(fetchMember({ type: 'designer' }));
								}}>
								#Designer
							</h2>
						</li>
						<li>
							<h2
								style={{ opacity: SelectedCategory === 'Director' ? 0.8 : 0.3 }}
								onClick={() => {
									setSelectedCategory('Director');
									dispatch(fetchMember({ type: 'director' }));
								}}>
								#Director
							</h2>
						</li>
						<li>
							<h2
								style={{ opacity: SelectedCategory === 'Producer' ? 0.8 : 0.3 }}
								onClick={() => {
									setSelectedCategory('Producer');
									dispatch(fetchMember({ type: 'producer' }));
								}}>
								#Producer
							</h2>
						</li>
					</ul>
					<div className='content'>
						<section className='textPart'>
							<div className='textBox'>
								<p>CREATIVE TECHNOLOGY</p>
								<h3>We set up teams to shape your identity, Push your idea!</h3>
								<span>&copy; CREATIVE LAB.</span>
							</div>
						</section>
						<section className='memberIntro'>
							{MemberData.map((member, idx) => {
								return (
									<article key={member + idx}>
										<div className='pic'>
											<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
										</div>
										<div className='memberInfo'>
											<h3>{member.name}</h3>
											<p>{member.position}</p>
										</div>
										<ul className='social'>
											<li>
												<a href='https://www.gmail.com' target='_blank' rel='noopener noreferrer'>
													<IoIosMail className='icon' />
												</a>
											</li>
											<li>
												<a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
													<IoLogoInstagram className='icon' />
												</a>
											</li>
											<li>
												<a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
													<IoLogoFacebook className='icon' />
												</a>
											</li>
										</ul>
									</article>
								);
							})}
						</section>
					</div>
				</section>
			</div>
		</Layout>
	);
}
