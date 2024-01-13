import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../../../redux/modalSlice';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modal.open);

	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0 }}
					transition={{ duration: 0.5 }}>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0.5 } }}
						transition={{ duration: 0.5, delay: 0.3 }}>
						{children}
					</motion.div>
					<span onClick={() => dispatch(modalClose())}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
