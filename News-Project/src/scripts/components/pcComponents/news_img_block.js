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

		const styleImage = {
			display: "block",
			width  : this.props.imageWidth,
			height : "90px"
		}
		const styleH3 = {
			width:this.props.imageWidth,
			whiteSpace:"nowrap",
			overflow:"hidden",
			textOverflow:"ellipsis"
		}

		const {news} = this.state;
		const newsList = news.length
		?
		news.map((newsItem,index)=>(
			<div key={index} class="imageblock">
				<Link to={`details/${newsItem.uniquekey}`} target="_blank">
					<div class="custom-image">
						<img src={newsItem.thumbnail_pic_s} style={styleImage} />
					</div>
					<div class="custom-card">
						<h3 style={styleH3}>{newsItem.title}</h3>
						<p>{newsItem.author_name}</p>
					</div>
				</Link>
			</div>
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
				<Card title={this.props.cardTitle} bordered={true} style={{width:this.props.width}}>
					{newsList}
				</Card>
			</div>
		);
	};
}