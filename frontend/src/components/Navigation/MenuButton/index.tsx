import { useEffect, useState, useRef } from 'react';
import DropdownMenu from './DropdownMenu';
import './MenuButton.css';

type Props = {
	displayInitial: string;
	displayName: string;
};

const MenuButton = ({ displayInitial, displayName }: Props) => {
	const [showDrop, setShowDrop] = useState(false);
	const dropdown = useRef<HTMLDivElement | null>(null);
	const arrowContainer = useRef<HTMLDivElement | null>(null);

	const toggleShowDropdown = () => {
		setShowDrop((prev) => !prev);
	};

	useEffect(() => {
		if (!showDrop) return;

		const clickHide = (e) => {
			if (!dropdown?.current?.contains(e.target) && !arrowContainer?.current?.contains(e.target)) {
				setShowDrop(false);
			}
		};

		document.addEventListener('click', clickHide);

		return () => document.removeEventListener('click', clickHide);
	}, [showDrop]);

	return (
		<>
			<div className="right-drop-icon-holder dropdown" ref={arrowContainer} onClick={toggleShowDropdown}>
				<i className="fa-solid fa-chevron-down dropbtn" />
			</div>
			{showDrop && (
				<div ref={dropdown}>
					<DropdownMenu displayName={displayName} displayInitial={displayInitial} setShowDrop={setShowDrop} />
				</div>
			)}
		</>
	);
};

export default MenuButton;
