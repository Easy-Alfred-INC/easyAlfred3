import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTable from 'react-table';

import * as Actions from './store/actions';

function ContactsList(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entities);
	console.log('contacts', contacts)
	// const selectedContactIds = useSelector(({ contactsApp }) => contactsApp.contacts.selectedContactIds);
	const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	// const user = useSelector(({ contactsApp }) => contactsApp.user);

	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (contacts) {
			setFilteredData(getFilteredArray(contacts, searchText));
		}
	}, [contacts, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no contacts!
				</Typography>
			</div>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<ReactTable
				className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
				getTrProps={(state, rowInfo, column) => {
					return {
						className: 'cursor-pointer',
						onClick: (e, handleOriginal) => {
							if (rowInfo) {
								dispatch(Actions.openEditContactDialog(rowInfo.original));
							}
						}
					};
				}}
				data={filteredData}
				columns={[
					// {
					// 	Header: () => (
					// 		<Checkbox
					// 			onClick={event => {
					// 				event.stopPropagation();
					// 			}}
					// 			onChange={event => {
					// 				return event.target.checked
					// 					? dispatch(Actions.selectAllContacts())
					// 					: dispatch(Actions.deSelectAllContacts());
					// 			}}
					// 			checked={
					// 				selectedContactIds.length === Object.keys(contacts).length &&
					// 				selectedContactIds.length > 0
					// 			}
					// 			indeterminate={
					// 				selectedContactIds.length !== Object.keys(contacts).length &&
					// 				selectedContactIds.length > 0
					// 			}
					// 		/>
					// 	),
					// 	accessor: '',
					// 	Cell: row => {
					// 		return (
					// 			<Checkbox
					// 				onClick={event => {
					// 					event.stopPropagation();
					// 				}}
					// 				checked={selectedContactIds.includes(row.value.id)}
					// 				onChange={() => dispatch(Actions.toggleInSelectedContacts(row.value.id))}
					// 			/>
					// 		);
					// 	},
					// 	className: 'justify-center',
					// 	sortable: false,
					// 	width: 64
					// },
					// {
					// 	// Header: () => selectedContactIds.length > 0 && <ContactsMultiSelectMenu />,
					// 	Header: 'Icon',
					// 	accessor: 'avatar',
					// 	Cell: row => <Avatar className="mx-8" alt={row.original.name} src={row.value} />,
					// 	className: 'justify-center',
					// 	width: 64,
					// 	sortable: false
					// },
					// {
					// 	// Header: () => selectedContactIds.length > 0 && <ContactsMultiSelectMenu />,
					// 	Header: 'Img',
					// 	accessor: 'avatar',
					// 	// <img src={form.description} alt="product" />
					// 	Cell: row => <img className="mx-8" alt={row.original.name} src={row.value} />,
					// 	// Cell: row => <Avatar className="mx-8" alt={row.original.name} src={row.value} />,
					// 	className: 'justify-center',
					// 	width: 64,
					// 	sortable: false
					// },
					{
						Header: 'Service Id',
						accessor: 'name',
						filterable: false,
						// width: 90,
						// className: 'font-bold'
					},
					{
						Header: 'Region',
						accessor: 'lastName',
						filterable: false,
						// width: 90,
						// className: 'font-bold'
					},
					{
						Header: 'Sub Region',
						accessor: 'company',
						filterable: false,
						// width: 90,
					},
					// {
					// 	Header: 'Zipcode',
					// 	accessor: 'jobTitle',
					// 	filterable: false,
					// },
					{
						Header: 'Notes',
						accessor: 'email',
						filterable: false,
					},
					// {
					// 	Header: 'Service Categories',
					// 	accessor: 'phone',
					// 	filterable: false,
					// 	// width: 150,
					// },
					// {
					// 	Header: '',
					// 	width: 128,
					// 	Cell: row => (
					// 		<div className="flex items-center">
					// 			{/* <IconButton
					// 				onClick={ev => {
					// 					ev.stopPropagation();
					// 					dispatch(Actions.toggleStarredContact(row.original.id));
					// 				}}
					// 			>
					// 				{user.starred && user.starred.includes(row.original.id) ? (
					// 					<Icon>star</Icon>
					// 				) : (
					// 					<Icon>star_border</Icon>
					// 				)}
					// 			</IconButton> */}
					// 			{/* <IconButton
					// 				onClick={ev => {
					// 					ev.stopPropagation();
					// 					dispatch(Actions.removeContact(row.original.id));
					// 				}}
					// 			>
					// 				<Icon>delete</Icon>
					// 			</IconButton> */}
					// 		</div>
					// 	)
					// }
				]}
				defaultPageSize={10}
				noDataText="No contacts found"
			/>
		</FuseAnimate>
	);
}

export default ContactsList;
