import './Layout.scss';

export default function Layout({ children }) {
	return (
		<main className='Layout'>
			<div className='tit'>
				<h2>category</h2>
				<h1>Title</h1>
			</div>
			<div className='bgImage'></div>
			{children}
		</main>
	);
}
