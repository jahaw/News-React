import React from 'react';
import {Col,Row} from 'antd';
import {Route,Router,Link} from 'react-router'

export default class MBList extends React.Component{
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
			<section key={index} className="m_article list-item special_section clearfix">
				<Link to={`details/${newsItem.uniquekey}`}>
					/*pic*/
					<div className="m_article_img">
						<img src={newsItem.thumbnail_pic_s} />
					</div>
					/*title*/
					<div className="m_article_info">
						<div className="m_article_title">
							<span>{newsItem.title}</span>
						</div>
					</div>
					/*Date*/
					<div className="m_article_desc clearfix">
						<div className="m_article_desc_l">
							<span className="m_article_channel">{newsItem.realtype}</span>
							<span className="m_article_time">{newsItem.date}</span>
						</div>
					</div>
				</Link>
			</section>
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
			<div>
				<Row>
					{newsList}
				</Row>
			</div>
		);
	};
}
