import React, { useContext, useRef, useState, useEffect, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const ModalContext = React.createContext<HTMLDivElement | undefined>(undefined);

interface IModalProviderProps {
	children: React.ReactNode;
}

export const ModalProvider = ({ children }: IModalProviderProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [value, setValue] = useState<HTMLDivElement | undefined>(undefined);

	useEffect(() => {
		if (modalRef.current) setValue(modalRef.current);
	}, []);

	return (
		<>
			<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
			<div ref={modalRef} />
		</>
	);
};

interface IModalProps {
	onClose: (e?: MouseEvent) => void;
	children: React.ReactNode;
	customClass?: string;
}

export const Modal = ({ onClose, children, customClass }: IModalProps) => {
	const modalNode = useContext(ModalContext);
	if (!modalNode) return null;

	return ReactDOM.createPortal(
		<div id="modal" className={customClass}>
			<div id="modal-background" onClick={onClose} />
			<div id="modal-content">
				<div id="x-button-holder" className={customClass}>
					<i className="fa-solid fa-xmark close-x-button" onClick={onClose} />
				</div>
				{children}
			</div>
		</div>,
		modalNode,
	);
};
