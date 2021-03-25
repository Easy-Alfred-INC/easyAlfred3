import React from 'react';
import {  useSelector } from 'react-redux';
import { InlineWidget } from "react-calendly";

function KnowledgeBasePage() {

	const user = useSelector(({ auth }) => auth.user);
	const {email, displayName } = user.data

	let firstname = ''
	let lastname = ''
	if (displayName.split(' ').length === 1){
		firstname = displayName
		lastname = ''
	} else {
		firstname = displayName.split(' ')[0]
		lastname = displayName.split(' ')[1]
	}

	return (
		<div className="w-full">
			<InlineWidget
				url="https://calendly.com/ringyouralfred/ring-your-alfred?primary_color=ffc926"
				prefill={{
					email: email,
					firstName: firstname,
					lastName: lastname,
					name: displayName,
				}}
			/>
		</div>
	);
}

export default KnowledgeBasePage;
