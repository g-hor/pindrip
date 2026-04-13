import { ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { getCurrentUser } from '@store/session';
import { fetchPin } from '@store/pin';
import { getInitial } from '@store/user';
import { fetchAllBoards, getSortedBoards } from '@store/board';
import { removeBoardPin, savePin } from '@store/boardPin';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { Modal } from '@context/modal';

import Avatar from '../../Profiles/Avatar/Avatar';
import EditPinForm from '../Edit/EditPinForm';
import { PinShowOptions } from './PinShowOptions';

import './PinShow.css';

const PinShow = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { pinId } = useParams();

	const pins = useAppSelector((state) => state?.pins);
	const pin = pins[parseInt(pinId)];
	const creator = useAppSelector((state) => state?.users[pin?.creator]);
	const currentUser = useAppSelector(getCurrentUser);
	const boards = useAppSelector(getSortedBoards);

	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const [isBoardsOpen, setIsBoardsOpen] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [saved, setSaved] = useState(false);
	const [removed, setRemoved] = useState(false);
	const [isSaved, setIsSaved] = useState(boards?.map((board) => board.savedPins.includes(pin?.id)));
	const [showSaveBtn, setShowSaveBtn] = useState(isSaved);
	const [selectedBoard, setSelectedBoard] = useState(boards[0]?.name || 'All Pins');
	const [creatorInitials, setCreatorInitials] = useState('');

	const background = useRef<HTMLDivElement | null>(null);
	const boardsButton = useRef<HTMLDivElement | null>(null);
	const boardsDropdown = useRef<HTMLDivElement | null>(null);
	const optionsButton = useRef<HTMLDivElement | null>(null);
	const optionsDropdown = useRef<HTMLDivElement | null>(null);

	const boardId = boards?.filter((board) => board?.name === selectedBoard)[0]?.id;
	const boardIndex = boards.indexOf(boards?.filter((board) => board?.name === selectedBoard)[0]);
	const isCurrentUserCreator = currentUser?.id === creator?.id;
	const isSavedToSelectedBoard = boards
		?.filter((board) => board?.name === selectedBoard)[0]
		?.savedPins?.includes(pin?.id);

	const truncateBoardName = (boardName, maxLength) => {
		if (boardName.length > maxLength) {
			return boardName.slice(0, maxLength) + '...';
		} else {
			return boardName;
		}
	};

	const goHome = (e) => {
		if (e.target !== background?.current) return;
		navigate(-1);
	};

	const clickBoard = (board) => {
		setSelectedBoard(board.name);
		setShowSaveBtn(isSaved);
		setShowSaveBtn((prev) => {
			const next = [...prev];
			isSaved[boardIndex] ? (next[boardIndex] = true) : (next[boardIndex] = false);
			return next;
		});
		setIsBoardsOpen(false);
	};

	const submitSave = async (boardId, pinId, boardIdx) => {
		if (!isSaved[boardIdx]) {
			setIsSaved((prev) => {
				const next = [...prev];
				next[boardIdx] = true;
				return next;
			});
			const res = await dispatch(savePin({ boardId, pinId }));
			if (res?.ok) {
				setSaved(true);
				setTimeout(() => setSaved(false), 3000);
			}
		} else {
			const res = await dispatch(removeBoardPin({ boardId, pinId }));
			if (res?.ok) {
				setIsSaved((prev) => {
					const next = [...prev];
					next[boardIdx] = false;
					return next;
				});
				setRemoved(true);
				setTimeout(() => setRemoved(false), 3000);
			}
		}
	};

	const submitRemoval = async () => {
		const res = await dispatch(removeBoardPin({ boardId, pinId: pin?.id }));
		if (res?.ok) {
			setRemoved(true);
			setTimeout(() => setRemoved(false), 3000);
		}
	};

	useEffect(() => {
		if (pin?.id) dispatch(fetchPin(pin?.id));
		dispatch(fetchAllBoards(currentUser?.id));
	}, [dispatch, showEdit, pin?.id, currentUser?.id]);

	useEffect(() => {
		const hideOptions = (e) => {
			if (
				!isOptionsOpen ||
				optionsDropdown.current?.contains(e.target) ||
				optionsButton.current?.contains(e.target)
			) {
				return;
			}
			setIsOptionsOpen(false);
		};

		const hideBoardsDropdown = (e) => {
			if (!isBoardsOpen || boardsDropdown.current?.contains(e.target) || boardsButton.current?.contains(e.target)) {
				return;
			}
			setIsBoardsOpen(false);
		};

		document.addEventListener('click', hideOptions);
		document.addEventListener('click', hideBoardsDropdown);
		document.addEventListener('click', goHome);

		return () => {
			document.removeEventListener('click', hideOptions);
			document.removeEventListener('click', hideBoardsDropdown);
			document.removeEventListener('click', goHome);
		};
	}, [isOptionsOpen, isBoardsOpen, goHome]);

	useEffect(() => {
		if (creator) {
			setCreatorInitials(getInitial(creator));
		}
	}, [creator]);

	return (
		<>
			{pin && (
				<div ref={background} id="show-page" onClick={goHome}>
					<div id="pin-show-container">
						<div id="pin-show-img-container">
							<img src={pin?.photo} alt={pin?.altText} id="pin-show-img" />
						</div>

						<div id="pin-info-container">
							<div>
								<div id="pin-show-top-bar">
									<div id="ellipsis-btn" ref={optionsButton} onClick={() => setIsOptionsOpen(true)}>
										{isCurrentUserCreator || isSavedToSelectedBoard ? (
											<>
												<i className="fa-solid fa-ellipsis" />
												{isOptionsOpen && (
													<div id="pin-show-drop" ref={optionsDropdown}>
														<PinShowOptions
															isCurrentUserCreator={isCurrentUserCreator}
															isSavedToSelectedBoard={isSavedToSelectedBoard}
															pinId={pin?.id}
															setShowEdit={setShowEdit}
															submitRemoval={submitRemoval}
														/>
													</div>
												)}
											</>
										) : (
											<div />
										)}
									</div>

									{showEdit && (
										<Modal onClose={() => setShowEdit(false)} customClass="edit-pin">
											<EditPinForm pin={pin} onClose={() => setShowEdit(false)} />
										</Modal>
									)}

									<div id="show-board-drop-save-btn-holder">
										<div
											id="show-pin-board-dropdown-btn"
											ref={boardsButton}
											onClick={() => setIsBoardsOpen(true)}
										>
											<i className="fa-solid fa-chevron-down dropbtn board-drop" />
											<div id="board-first-option">{truncateBoardName(selectedBoard, 8)}</div>

											{isBoardsOpen && (
												<div id="board-options-menu" ref={boardsDropdown}>
													<div id="board-options-title">All boards</div>

													<div id="board-options-container">
														{boards?.map((board, i) => (
															<div
																className="board-dropdown-option"
																key={board.id}
																onClick={() => clickBoard(board)}
																onMouseEnter={() =>
																	setShowSaveBtn((prev) => {
																		const next = [...prev];
																		next[i] = true;
																		return next;
																	})
																}
																onMouseLeave={() =>
																	setShowSaveBtn((prev) => {
																		const next = [...prev];
																		if (isSaved[i]) return next;
																		next[i] = false;
																		return next;
																	})
																}
															>
																<div className="board-dropdown-thumbnail-holder">
																	{pins[board.savedPins[0]]?.photo && (
																		<img
																			className="board-dropdown-thumbnail"
																			src={pins[board.savedPins[0]]?.photo}
																			alt=""
																		/>
																	)}
																</div>
																<div className="board-dropdown-info">
																	<div className="board-dropdown-name-holder">
																		<div>{truncateBoardName(board.name, 15)}</div>
																		{board.savedPins.includes(parseInt(pinId)) && (
																			<div>Saved here already</div>
																		)}
																	</div>
																	{(showSaveBtn[i] || isSaved[i]) && (
																		<div
																			id="show-pin-save-btn"
																			className={isSaved[i] ? 'saved' : ' '}
																			onClick={() => submitSave(board?.id, pinId, i)}
																		>
																			{isSaved[i] ? 'Saved' : 'Save'}
																		</div>
																	)}
																</div>
															</div>
														))}
													</div>
												</div>
											)}
										</div>

										<div
											id="show-pin-save-btn"
											className={isSaved[boardIndex] ? 'saved' : ' '}
											onClick={() => submitSave(boardId, pinId, boardIndex)}
										>
											{isSaved[boardIndex] ? 'Saved' : 'Save'}
										</div>
									</div>
								</div>

								<div id="pin-show-website">
									<a href="https://github.com/g-hor/pindrip" target="_blank" rel="noreferrer">
										{pin?.website}
									</a>
								</div>

								<div id="pin-show-title">{pin?.title}</div>

								<div id="pin-show-description">{pin?.description}</div>
							</div>

							<div id="pin-show-creator-info">
								<div id="create-pin-user-info">
									<Link to={`/${creator?.username}`}>
										{creator?.avatar && <Avatar avatarUrl={creator?.avatar} />}

										{!creator?.avatar && <div id="pin-show-creator-initial">{creatorInitials}</div>}
									</Link>

									<Link to={`/${creator?.username}`}>
										<div>{creator?.firstName + ' ' + (creator?.lastName || '')}</div>
									</Link>
								</div>
							</div>
						</div>

						<div id="saved-msg-container" className={removed ? 'saved save-pin-show' : 'save-pin-show'}>
							Drip removed successfully!
						</div>

						<div id="saved-msg-container" className={saved ? 'saved save-pin-show' : 'save-pin-show'}>
							Drip saved successfully!
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PinShow;
