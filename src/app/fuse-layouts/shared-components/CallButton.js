import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import React from 'react';

import CallIcon from '@material-ui/icons/Call';
import Chip from '@material-ui/core/Chip';

const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)

function CallButton() {

	if (!isMobileDevice) {
		return (
			<div>
				<Chip
					icon={<CallIcon />}
					label="877-658-1429"
					color="secondary"
					style={{ "height": "36px", "border-radius": "4px"}}
				/>
			</div>
		)
	}

	return (
		<Button
			component="a"
			href="tel:+1-877-658-1429"
			// target="_blank"
			rel="noreferrer noopener"
			role="button"
			className="normal-case"
			variant="contained"
			color="secondary"
		>
			<Icon className="text-16">call</Icon>
			<span className="mx-4">Ring Alfred Now</span>
		</Button>
	);
}

export default CallButton;
