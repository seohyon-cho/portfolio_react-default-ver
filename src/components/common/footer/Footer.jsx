import { useRef } from 'react';
import './Footer.scss';
import { IoIosMail, IoLogoInstagram, IoLogoFacebook } from 'react-icons/io';
import { IoNavigate, IoCall } from 'react-icons/io5';

export default function Footer() {
	const path = useRef(process.env.PUBLIC_URL);
	return (
		<footer className='Footer'>
			<div className='topBox'>
				<ul className='links'>
					<li>
						<ul className='Link1'>
							<h3>Support</h3>
							<li>Contact us</li>
							<li>Support Forum</li>
							<li>Free Trial</li>
						</ul>
					</li>
					<li>
						<ul className='Link2'>
							<h3>About Us</h3>
							<li>Gallery</li>
							<li>Youtube</li>
							<li>Department</li>
						</ul>
					</li>
					<li>
						<ul className='Link3'>
							<h3>Policy</h3>
							<li>EULA</li>
							<li>Privacy Policy</li>
							<li>Terms & Conditions</li>
						</ul>
					</li>
				</ul>
				<ul className='icons'>
					<li>
						<a href='https://www.gmail.com' target='_blank' rel='noopener noreferrer'>
							<IoIosMail />
						</a>
					</li>
					<li>
						<a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
							<IoLogoFacebook />
						</a>
					</li>
					<li>
						<a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
							<IoLogoInstagram />
						</a>
					</li>
				</ul>
				<ul className='info'>
					<h3>Info Title</h3>
					<li>
						<p>6A Hampstead High Street</p>
						<IoNavigate />
					</li>
					<li>
						<p>NW3 1PR, London, UK</p>
						<IoNavigate />
					</li>
					<li>
						<p>tel.: +44 1234 10 20 81</p>
						<IoCall />
					</li>
					<li>
						<p>email: support@trafficbot.uk</p>
						<IoIosMail />
					</li>
				</ul>
			</div>
			<div className='bottomBox'>
				<ul>
					<h2>MELLOW</h2>
					<li className='info'>End User License Agreement</li>
					<li className='info'>Privacy Policy</li>
					<li className='info'>Terms & Conditions</li>
					<li>
						<ul className='icons'>
							<li>
								<img src={`${path.current}/img/visa.png`} alt='visa' />
							</li>
							<li>
								<img src={`${path.current}/img/master.png`} alt='master' />
							</li>
							<li>
								<img src={`${path.current}/img/paypal.png`} alt='paypal' />
							</li>
						</ul>
					</li>
					<li className='copy'>&copy; 2023 Creative.Lab</li>
				</ul>
			</div>
		</footer>
	);
}
