import './Subscribe.scss';

export default function Subscribe() {
	return (
		<div className='Subscribe myScroll'>
			<section className='headline'>
				<h2>
					‘How bright the windows are, <br />
					when the dear sun shineth.’ 
				</h2>
				<p>Lesbia Harford</p>
			</section>
			<section className='caption'>
				<div className='left'>
					<h3>Vicob Certification</h3>
					<p>We meets strict standards for social and environmental performance, transparency, and accountability.</p>
				</div>
				<div className='right'>
					<h3>PETA Approved</h3>
					<p>We included on PETA's internationally recognized vegan and cruelty-free list.</p>
				</div>
			</section>
			<section className='sign'>
				<h2>Subscribe to our newsletter</h2>
				<form className='inputBox'>
					<input type='email' placeholder='Enter Your Email' required />
					<button type='submit'>GO !</button>
				</form>
			</section>
		</div>
	);
}
