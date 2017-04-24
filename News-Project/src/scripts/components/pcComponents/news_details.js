import React from 'react';
import {Col,Row,BackTop} from 'antd';
import PCHeader from './header.js';
import PCFooter from './footer.js';
import NewsImgBlock from './news_img_block.js';
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
			document.title = this.state.newsItem.title + "- react新闻项目";
		})
	};

	addNodes(){
		return {__html: this.state.newsItem.pagecontent}
	};

	render(){
		return(
			<div>
				<PCHeader />
				<Row>
					<Col span={2}></Col>
					<Col span={14} className="container">
						<div className="articleContainer" dangerouslySetInnerHTML={this.addNodes()}></div>
						<Comment uniquekey={this.props.params.uniquekey} />
					</Col>
					<Col span={6}>
						<NewsImgBlock count={12} type="guoji" width="100%" imageWidth="150px" />
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter />
				<BackTop />
			</div>
		);
	};
}