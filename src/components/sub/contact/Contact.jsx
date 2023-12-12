import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { IoIosCall } from 'react-icons/io';
import { IoLocationSharp, IoChatbubblesSharp } from 'react-icons/io5';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

export default function Contact() {
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

	return (
		<Layout category={'HOME / CONTACT'} title={'Contact Us'}>
			<div className='Contact'>
				<section className='visual'>
					<h1>We'd love to hear from you.</h1>
				</section>
				<section className='info'>
					<div className='message'>
						<h3>Send a Message</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio amet natus iure tempora exercitationem architecto.</p>
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
									<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sequi odit, optio distinctio tempore consectetur.</li>
									<li>
										<IoIosCall className='icon' /> <span>+82 1234 10 20 81</span>
									</li>
								</ul>
							</li>
							<li>
								<ul className='visit'>
									<h4>Visit Us</h4>
									<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sequi odit, optio distinctio tempore consectetur.</li>
									<li>
										<IoLocationSharp className='icon' /> <span>6A Hampstead High Street</span>
									</li>
								</ul>
							</li>
							<li>
								<ul className='live'>
									<h4>Live Chat</h4>
									<li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sequi odit.</li>
									<li>
										<IoChatbubblesSharp className='icon' /> <span>support@trafficbot.uk</span>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</section>
				<div className='map'></div>
				<section className='question'></section>
			</div>
		</Layout>
	);
}
