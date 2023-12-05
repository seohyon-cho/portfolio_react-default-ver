import './Footer.scss';
import { IoIosMail, IoLogoInstagram, IoLogoFacebook } from 'react-icons/io';

export default function Footer() {
	return (
		<footer className='Footer'>
			<div className='topBox'>
				<ul className='links'>
					<li>
						<ul className='Link1'>
							<h3>Link1</h3>
							<li>Contact us</li>
							<li>Support Forum</li>
							<li>Free Trial</li>
						</ul>
					</li>
					<li>
						<ul className='Link2'>
							<h3>Link1</h3>
							<li>Career</li>
							<li>Our Blog</li>
							<li>Affiliates</li>
						</ul>
					</li>
					<li>
						<ul className='Link3'>
							<h3>Link1</h3>
							<li>EULA</li>
							<li>Privacy Policy</li>
							<li>Terms & Conditions</li>
						</ul>
					</li>
				</ul>
				<ul className='icons'>
					<li>
						<IoIosMail />
					</li>
					<li>
						<IoLogoFacebook />
					</li>
					<li>
						<IoLogoInstagram />
					</li>
				</ul>
				<ul className='info'>
					<h3>Info Title</h3>
					<li>6A Hampstead High Street</li>
					<li>NW3 1PR, London, UK</li>
					<li>tel.: +44 1234 10 20 81</li>
					<li>email: support@trafficbot.uk</li>
				</ul>
			</div>
			<div className='bottomBox'></div>
		</footer>
	);
}
