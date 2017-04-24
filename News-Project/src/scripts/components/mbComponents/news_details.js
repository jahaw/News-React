import React from 'react';
import {Col,Row,BackTop} from 'antd';
import MBHeader from './header.js';
import MBFooter from './footer.js';
import Comment from '../common/comment.js';

export default class NewsDetails extends React.Component{
	constructor(){
		super();
		this.state = {
			newsItem:"", 
		};
	};

	// 页面加载完再取内容
	componentDidMount(){
		let fetchConfig = {
			method:"GET"
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.params.uniquekey,fetchConfig)
		.then(response=>response.json())
		.then(json=>{
			this.setState({newsItem:json});
		})
	};

	addNodes(){
		return {__html: this.state.newsItem.pagecontent}
	};

	render(){
		return(
			<div className="mobileDetailsContainer">
				<MBHeader />
				<div className="ucmobileList">
					<Row>
						<Col span={1} />
						<Col span={22} className="container">
							<div className="articleContainer" dangerouslySetInnerHTML={this.addNodes()}></div>
							<Comment uniquekey={this.props.params.uniquekey} />
						</Col>
						<Col span={1} />
					</Row>
					<MBFooter />
					<BackTop />
				</div>
			</div>
		);
	};
}