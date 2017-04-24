import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import { Row, Col } from 'antd';
import { Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal,Card,notification} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Comment extends React.Component {
	constructor(){
		super();
		this.state = {
			comments:""
		};
	};

	componentDidMount(){
		let fetchConfig = {
			method:"GET"
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey,fetchConfig)
		.then(response=>response.json())
		.then(json=>{
			this.setState({comments:json});
		})
	};

	handleSubmit(e){
		e.preventDefault();
		let formData = this.props.form.getFieldsValue();
		let fetchConfig = {
			method:"GET"
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="
			+localStorage.userid
			+"&uniquekey="+this.props.uniquekey
			+"&commnet="+formData.remark,fetchConfig)
		.then(response=>response.json())
		.then(json=>{
			this.componentDidMount();
		});
	};

	addCollect(){
		let fetchConfig = {
			method:"GET"
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="
			+localStorage.userid
			+"&uniquekey="+this.props.uniquekey,fetchConfig)
			.then(response=>response.json())
			.then(json=>{
				notification.open({
				    message: '收藏此文章成功',
				    description:'该文章已被收藏',
				    icon:<Icon type="check-circle" />,
				    duration:2
				  });
			})
	}

	render(){
		let {getFieldDecorator} = this.props.form; 
		const {comments} = this.state;
		const commentList = comments.length
		?
		comments.map((comment,index)=>(
			<Card key={index} title={comment.UserName} extra={<a href="#">发表于{comment.datetime}</a>}>
				<p>{comment.Commnets}</p>
			</Card>
		))
		:
		"没有任何相关评论";

		return(
			<div className="comment">
				<Row>
					<Col span={24}>
						<commentList />
						<Form onSubmit = {this.handleSubmit.bind(this)}>
							<FormItem >
								<h3>你的评论</h3>
								<Input type="textarea" placeholder="多说系统为您服务~" {...getFieldDecorator('remark',{initialValue:""})}></Input>
							</FormItem>
							<Button type="primary" htmlType="submit">提交评论</Button>
							&nbsp;&nbsp;
							<Button type="primary" htmlType="button" onClick={this.addCollect.bind(this)}>收藏文章</Button>
						</Form>
					</Col>
				</Row>
			</div>
		);
	};
}

export default Comment = Form.create({})(Comment);