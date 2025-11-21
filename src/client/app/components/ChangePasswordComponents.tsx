import * as React from 'react';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { useTranslate } from '../redux/componentHooks';
import { showErrorNotification, showSuccessNotification } from '../utils/notifications';

interface ChangePasswordProps {
	handleClose: () => void;
}

/**
 *
 * @param handleClose Function to close modal after changing password
 * @param handleClose.handleClose Needed by ESLint see above
 * @returns
 */
export default function ChangePasswordComponent({ handleClose }: ChangePasswordProps) {
	const translate = useTranslate();

	const [currentPassword, setCurrentPassword] = useState<string>('');
	const [newPassword, setPassword] = useState<string>('');
	const [confirmedPassword, setConfirmedPassword] = useState<string>('');

	const [passwordLengthValid, setPasswordLengthValid] = useState(true);
	const [passwordMatch, setPasswordMatch] = useState(true);

	useEffect(() => {
		setPasswordLengthValid(newPassword.length === 0 || newPassword.length >= 8);
		setPasswordMatch(newPassword === confirmedPassword);
	}, [newPassword, confirmedPassword]);

	const handleSubmit = () => {
		if (!passwordLengthValid) {
			showErrorNotification(translate('user.password.length'));
			return;
		}
		if (!passwordMatch) {
			showErrorNotification(translate('user.password.mismatch'));
			return;
		}
		showSuccessNotification(translate('user.password.changed'));
		handleClose();
	};

	return (
		<div>
			<Form style={formStyle}>
				<FormGroup>
					<Label for='currentPassword'>{translate('password.current')}</Label>
					<Input
						id='currentPassword'
						type='password'
						value={currentPassword}
						onChange={e => setCurrentPassword(e.target.value)}
					/>
				</FormGroup>

				<FormGroup>
					<Label for='newPassword'>{translate('password.new')}</Label>
					<Input
						id='newPassword'
						type='password'
						value={newPassword}
						onChange={e => setPassword(e.target.value)}
						invalid={!passwordLengthValid}
					/>
					<FormFeedback>
						{translate('user.password.length')}
					</FormFeedback>
				</FormGroup>

				<FormGroup>
					<Label for='confirmedPassword'>{translate('password.confirm')}</Label>
					<Input
						id='confirmedPassword'
						type='password'
						value={confirmedPassword}
						onChange={e => setConfirmedPassword(e.target.value)}
						invalid={!passwordMatch}
					/>
					<FormFeedback>
						{translate('user.password.mismatch')}
					</FormFeedback>
				</FormGroup>

				<div className='row'>
					<div className='col'>
						<Button
							outline
							type='submit'
							onClick={handleSubmit}
							disabled={
								!currentPassword.length ||
								!newPassword.length ||
								!confirmedPassword.length ||
								!passwordLengthValid ||
								!passwordMatch
							}
						>
							<FormattedMessage id='submit' />
						</Button>
					</div>

					<div className='col'>
						<Button
							outline
							type='button'
							onClick={handleClose}
						>
							<FormattedMessage id='close' />
						</Button>
					</div>
				</div>
			</Form>
		</div>
	);
}

const formStyle = {
	maxWidth: '500px',
	margin: 'auto',
	width: '50%'
};