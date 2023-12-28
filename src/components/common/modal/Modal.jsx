import { useGlobalData } from '../../../hooks/useGlobalData';
import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ children }) {
	const { ModalOpen, setModalOpen } = useGlobalData();
	return (
		<AnimatePresence>
			{ModalOpen && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 2, transition: { delay: 0.5 } }}
					transition={{ duration: 0.5 }}>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0.3 } }}
						transition={{ duration: 0.5, delay: 0.3 }}>
						{children}
					</motion.div>
					<span onClick={() => setModalOpen(false)}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
