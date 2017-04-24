import React from 'react';
import {Card} from 'antd';
import {Route,Router,Link} from 'react-router'

export default class PCNewsBlock extends React.Component{
	constructor(){
		super();
		this.state= {
			news:''
		}
	};

	componentWillMount(){
		let fetchConfig = {
			method:'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
			+ this.props.type
			+ "&count="+ this.props.count,fetchConfig)
		.then(response=>response.json())
		.then(json=>this.setState({news:json}));
	}

	render(){

		const {news} = this.state;
		const newsList = news.length
		?
		news.map((newsItem,index)=>(
			<li key={index}>
				<Link to={`details/${newsItem.uniquekey}`} target="_blank">
					{newsItem.title}
				</Link>
			</li>
		))
		:
		<div class="spinner">
		  <div class="rect1"></div>
		  <div class="rect2"></div>
		  <div class="rect3"></div>
		  <div class="rect4"></div>
		  <div class="rect5"></div>
		</div>;

		return(
			<div class="topNewsList">
				<Card>
					<ul>{newsList}</ul>
				</Card>
			</div>
		);
	};
}