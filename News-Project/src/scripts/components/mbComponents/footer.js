import React from 'react';
import { Row, Col } from 'antd';

export default class MBFooter extends React.Component {

	constructor(){
		super();
		
	}


	render(){
		return(
			<footer>
				<Row>
					<Col span={2}></Col>
					<Col span={20} class="footer">
						Copyright © &nbsp;2017 TomorrowNews. All Rights Reserved.
					</Col>
					<Col span={2}></Col>
				</Row>
			</footer>
		);
	};
}