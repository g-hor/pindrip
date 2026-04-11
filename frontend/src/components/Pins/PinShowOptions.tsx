import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@store/hooks';
import { deletePin } from '@store/pin';

export const PinShowOptions = ({ isCurrentUserCreator, isSavedToSelectedBoard, pinId, setShowEdit, submitRemoval }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// If the current user is the creator of the pin, display options to allow editing or deletion
	// Additionally, if the current selected board already has this pin saved to it, allow removal option
	if (isCurrentUserCreator) {
		return (
			<ul>
				<li className="show-pin-drop-option" onClick={() => setShowEdit(true)}>
					Edit Pin
				</li>
				{isSavedToSelectedBoard && (
					<li className="show-pin-drop-option" onClick={() => submitRemoval()}>
						Remove Pin
					</li>
				)}
				<li
					className="show-pin-drop-option"
					onClick={() => {
						dispatch(deletePin(pinId));
						navigate(-1);
					}}
				>
					Delete Pin
				</li>
			</ul>
		);
	} else if (isSavedToSelectedBoard) {
		// If current user is not the creator, check if the pin is saved to selected board and allow removal option
		return (
			<ul>
				<li className="show-pin-drop-option" onClick={() => submitRemoval()}>
					Remove Pin
				</li>
			</ul>
		);
	}
};
