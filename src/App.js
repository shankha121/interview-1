import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = {
		workDetails: [
			{
				id: '1',
				workItem: 'Coding',
				dueDate: '23/07/2019',
				resourceNeeded: '1'
			},
			{
				id: '2',
				workItem: 'Gaming',
				dueDate: '24/07/2019',
				resourceNeeded: '2'
			},
			{
				id: '3',
				workItem: 'Excel',
				dueDate: '25/07/2019',
				resourceNeeded: '3'
			}
		],
		editIndex: null
	};

	blankWorkDetail = {
		id: '',
		workItem: '',
		dueDate: '',
		resourceNeeded: ''
	};
	workDetailArray = null;

	addNewHandler = () => {
		const workDetailArray = [...this.state.workDetails, this.blankWorkDetail];
		this.setState(
			{
				workDetails: workDetailArray,
				editIndex: workDetailArray.length - 1
			},
			() => {
				this.workDetailArray = [...this.state.workDetails];
			}
		);
	};

	editAndSaveHandler = index => {
		if (index === this.state.editIndex) {
			//Save Functionality
			this.workDetailArray = null;
			this.setState({ editIndex: null });
		} else if (Number.isInteger(this.state.editIndex)) {
			this.setState({
				workDetails: this.workDetailArray,
				editIndex: index
			});
		} else {
			this.workDetailArray = [...this.state.workDetails];
			this.setState({ editIndex: index });
		}
	};
	onChangeHandler = (propName, event, index) => {
		if (index === this.state.editIndex) {
			const workDetail = { ...this.state.workDetails[index] };
			switch (propName) {
				case 'id':
					workDetail.id = event.target.value;
					break;
				case 'workItem':
					workDetail.workItem = event.target.value;
					break;
				case 'dueDate':
					workDetail.dueDate = event.target.value;
					break;
				case 'resourceNeeded':
					workDetail.resourceNeeded = event.target.value;
					break;
				default:
			}
			const workDetailArray = [...this.state.workDetails];
			workDetailArray[index] = workDetail;
			this.setState({
				workDetails: workDetailArray
			});
		}
	};

	deleteHandler = index => {
		const workDetails = [...this.state.workDetails];
		workDetails.splice(index, 1);
		this.setState({
			workDetails: workDetails
		});
	};

	render() {
		return (
			<div className='App'>
				<h1>Interview 1</h1>
				<button onClick={this.addNewHandler}>Add New</button>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Work Item</th>
							<th>Due Date</th>
							<th>Number of Resources Needed</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.state.workDetails.map((workDetails, index) => (
							<tr key={index}>
								<td>
									<input
										type='text'
										value={workDetails.id}
										onChange={event =>
											this.onChangeHandler('id', event, index)
										}></input>
								</td>
								<td>
									<input
										type='text'
										value={workDetails.workItem}
										onChange={event =>
											this.onChangeHandler('workItem', event, index)
										}></input>
								</td>
								<td>
									<input
										type='text'
										value={workDetails.dueDate}
										onChange={event =>
											this.onChangeHandler('dueDate', event, index)
										}></input>
								</td>
								<td>
									<input
										type='text'
										value={workDetails.resourceNeeded}
										onChange={event =>
											this.onChangeHandler('resourceNeeded', event, index)
										}></input>
								</td>
								<td className='centerize'>
									<button onClick={() => this.editAndSaveHandler(index)}>
										{this.state.editIndex === index ? 'Save' : 'Edit'}
									</button>
									<button onClick={() => this.deleteHandler(index)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
