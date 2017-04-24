import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import { Row, Col } from 'antd';
import { Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal,Upload,Card} from 'antd';
const TabPane = Tabs.TabPane;
import PCHeader from './header.js';
import PCFooter from './footer.js';

export default class UserCenter extends React.Component {

	constructor(){
		super();
		this.state = {
		    previewVisible: false,
		    previewImage: '',
		    usercollection: '',
		    usercomment:''
		};
	};

	componentDidMount() {
		var fetchConfig = {
			method: 'GET'
		};
		// 拿收藏
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, fetchConfig)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});
		// 拿评论
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, fetchConfig)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});
	};

	handleCancel(){
		this.setState({ previewVisible: false });	
	};

	render(){

		const props = {
			action:"http:newsapi.gugujiankong.com/handler.ashx",
			header:{
				"Access-Control-Allow-Origin":"*"
			},
			listType:"picture-card",
			defaultFileList:[
				{
					uid:-1,
					name:'xxx.png',
					state:'done',
					url:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
					thumbUrl:'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
				}
			],
			onPreview:(file)=>{
				this.setState({previewImage:file.url,previewVisible:true});
			}
		};

		const {usercollection} =this.state;
		const usercollectionList = usercollection.length
		?
		usercollection.map((uc,index)=>(
			<Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
				<p>{uc.Title}</p>
			</Card>
		))
		:
		"无收藏内容";

		const {usercomment} =this.state;
		const usercommentList = usercomment.length
		?
		usercomment.map((comment,index)=>(
			<Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
				<p>{comment.Comments}</p>
			</Card>
		))
		:
		"没有任何评论";

		return(
			<div>
				<PCHeader />
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<Tabs>
							<TabPane tab="我的收藏" key="1">
								<div className="comment">
									<Row>
										<Col span={24}>
											{usercollectionList}
										</Col>
									</Row>
								</div>
							</TabPane>
							<TabPane tab="我的评论" key="2">
								<div className="comment">
									<Row>
										<Col span={24}>
											{usercommentList}
										</Col>
									</Row>
								</div>
							</TabPane>
							<TabPane tab="设置头像" key="3">
								<div className="clearfix">
							        <Upload {...props}>
							        	<Icon type="plus"/>
							        	<div className="ant-upload-text">上传照片</div>
							        </Upload>
							        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
							          <img style={{ width: '100%' }} src={this.state.previewImage} />
							        </Modal>
						        </div>
							</TabPane>
						</Tabs>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter />
			</div>
		)
	}
}