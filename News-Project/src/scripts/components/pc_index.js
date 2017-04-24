import React from 'react';
import PCHeader from './pcComponents/header.js';
import PCFooter from './pcComponents/footer.js';
import NewsBox from './pcComponents/newsbox.js';

export default class PCIndex extends React.Component {
	render(){
		return(
			<div>
				<PCHeader></PCHeader>
				<NewsBox></NewsBox>
				<PCFooter></PCFooter>
			</div>
		);
	};
}