import * as React from 'react';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { User, UserRole, userDefaults } from '../../../types/items';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useTranslate } from '../../../redux/componentHooks';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';

interface ChangePasswordProps {
	user: User;
	handleClose: () => void;
}

/**
 * 
 * @param props 
 * @returns 
 */
export default function ChangePasswordComponent(props: ChangePasswordProps) {
	const translate = useTranslate();

	const [newPassword, setPassword] = useState<string>('');
	const [confirmedPassword, setConfirmedPassword] = useState<string>('');

	//const currentLoggedInUser = useAppSelector(selectCurrentUserProfile) as User;

	const [userDetails, setUserDetails] = useState({
		...userDefaults,
		...props.user,
	});

	const initialUserDetails = {
		...userDefaults,
		...props.user
	};

	useEffect(() => {
		// If any character is added in either field, it will count as password
		// being modified. This will actively update the passwordModified
		// boolean value when any change is made.
		const passwordFieldChanged = userDetails.password.length > 0 || userDetails.confirmPassword.length > 0;

		setUserDetails(prevDetails => ({
			...prevDetails,
			passwordMatch: (userDetails.password === userDetails.confirmPassword),
			passwordLength: userDetails.password.length > 7 || userDetails.password.length === 0
		}));
	}, [userDetails.password, userDetails.confirmPassword]);

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		if(newPassword !== confirmedPassword) {
			showErrorNotification(translate('user.password.mismatch'));
			return;
		}
		handleClose();
	}


	return (
		<div>
			<h2>Change Password</h2>
			<FormGroup>
				<Label for='password'>
					{translate('password')}
				</Label>
				<Input
					id='password'
					name='password'
					type='password'
					placeholder={translate('user.password.edit')}
					value={userDetails.password}
					onChange={e => handleStringChange(e)}
					invalid={!userDetails.passwordLength}
				/>
				<FormFeedback>
					{translate('user.password.length')}
				</FormFeedback>
			</FormGroup>
			<FormGroup>
				<Label for='confirmPassword'>
					{translate('password.confirm')}
				</Label>
				<Input
					id='confirmPassword'
					name='confirmPassword'
					type='password'
					value={userDetails.confirmPassword}
					onChange={e => handleStringChange(e)}
					invalid={!userDetails.passwordMatch}
				/>
				<FormFeedback>
					{translate('user.password.mismatch')}
				</FormFeedback>
			</FormGroup>
		</div>
	);

}