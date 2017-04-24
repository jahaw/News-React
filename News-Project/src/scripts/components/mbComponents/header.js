import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import { Row, Col } from 'antd';
import { Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MBHeader extends React.Component {
	constructor(){
		super();
		this.state= {
			current:"top",
			modalVisible:false,
			action:"login",
			isLoged:false,
			nickName:"",
			userid:0
		};
	}

	setModalVisible(value){
		this.setState({modalVisible:value});
	};

	handleSubmit(e){
		e.preventDefault();
		let fetchConfig = {
			method:"GET"
		};
		let formData= this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="
			+this.state.action
			+"&username="+formData.userName+"&password="+formData.password
			+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password
			+"&r_confirmPassword="+formData.r_confirmPassword,fetchConfig)		
		.then(response=>response.json())
		.then(json=>{
			this.setState({nickName:json.NickUserName,userid:json.UserId});
		});
		if(this.state.action=="login"){
			this.setState({isLoged:true})
		};
		message.success("成功啦~");
		this.setModalVisible(false);
	};

	callback(key){
		if(key==1){
			this.setState({action:'login'});
		}else if(key==2){
			this.setState({action:'register'});
		}
	};

	login(){
		this.setModalVisible(true);
	};

	render(){
		let {getFieldDecorator} = this.props.form;
		const userShow = this.state.isLoged
		?
		<Link to={`/usercenter`}>
			<Icon type="inbox" />
		</Link>
		:
		<Icon type="user" onClick={this.login.bind(this)} />

		return(
			<div id="mbheader">
				<header>
					<Link to={'/'}>
						<img src="./images/logo.png" />
					</Link>
					<span>明日头条</span>
					{userShow}
				</header>
				<Modal title="用户中心" wrapClassName="vertical-center-modal" footer={null} visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)}>
					<Tabs type="card" onChange={this.callback.bind(this)}>

						<TabPane tab="登录" key="1">
							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									<Input placeholder="请输入您的账号" {...getFieldDecorator('userName')}/>
								</FormItem>
								<FormItem label="密码">
									<Input type="password" placeholder="请输入您的密码" {...getFieldDecorator('password')}/>
								</FormItem>
								<Button type="primary" htmlType="submit" >登录</Button>
							</Form>
						</TabPane>

						<TabPane tab="注册" key="2">
							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									<Input placeholder="请输入您的账号" {...getFieldDecorator('r_userName')}/>
								</FormItem>
								<FormItem label="密码">
									<Input type="password" placeholder="请输入您的密码" {...getFieldDecorator('r_password')}/>
								</FormItem>
								<FormItem label="确认密码">
									<Input type="password" placeholder="请再次输入您的密码" {...getFieldDecorator('r_confirmPassword')}/>
								</FormItem>
								<Button type="primary" htmlType="submit" >注册</Button>
							</Form>
						</TabPane>

					</Tabs>
				</Modal>
			</div>
		);
	};
}

export default MBHeader = Form.create({})(MBHeader);