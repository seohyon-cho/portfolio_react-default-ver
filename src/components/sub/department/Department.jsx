import { useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { IoIosMail, IoLogoInstagram, IoLogoFacebook } from 'react-icons/io';
import { useHistoryQuery } from '../../../hooks/useHistoryQuery';
import { useDepartmentQuery } from '../../../hooks/useDepartmentQuery';
import { useCustomText } from '../../../hooks/useText';

export default function Department() {
	const [SelectedCategory, setSelectedCategory] = useState('Designer');
	const combinedTitle = useCustomText('combined');
	const path = useRef(process.env.PUBLIC_URL);
	const [Opt, setOpt] = useState(`${path.current}/DB/designer.json`);
	const { data: HistoryData, isSuccess: isHistory } = useHistoryQuery();
	const { data: MemberData, isSuccess: isMember } = useDepartmentQuery(Opt);

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
						<h2>{combinedTitle('History')}</h2>
						<div className='con'>
							{isHistory &&
								HistoryData.map((history, idx) => {
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
									setOpt(`${path.current}/DB/designer.json`);
								}}>
								#Designer
							</h2>
						</li>
						<li>
							<h2
								style={{ opacity: SelectedCategory === 'Director' ? 0.8 : 0.3 }}
								onClick={() => {
									setSelectedCategory('Director');
									setOpt(`${path.current}/DB/director.json`);
								}}>
								#Director
							</h2>
						</li>
						<li>
							<h2
								style={{ opacity: SelectedCategory === 'Producer' ? 0.8 : 0.3 }}
								onClick={() => {
									setSelectedCategory('Producer');
									setOpt(`${path.current}/DB/producer.json`);
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
							{isMember &&
								MemberData.map((member, idx) => {
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
