import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import { Row, Col } from 'antd';
import { Menu,Icon,Tabs,message,Form,Input,Button,CheckBox,Modal} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class PCHeader extends React.Component {
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
	};

	componentWillMount(){
		if(localStorage.userid != ''){
			this.setState({isLoged:true});
			this.setState({nickName:localStorage.nickName,userid:localStorage.userid})
		}
	}

	setModalVisible(value){
		this.setState({modalVisible:value});
	};

	// 点击导航栏按钮切换焦点状态以及是否弹出登录注册蒙层
	handleClick(e){
		if(e.key=="register"){
			this.setState({current:'register'});
			this.setModalVisible(true);
		}else{
			{
				this.setState({current:e.key});
			}
		}
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
			this.setState({nickName: json.NickUserName, userid: json.UserId});
			localStorage.nickName = json.NickUserName;
			localStorage.userid = json.UserId;
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
		console.log(this.state.nickName);
	};

	logout(){
		localStorage.nickName = '';
		localStorage.userid = '';
		this.setState({isLoged:false});
	}

	render(){

		let {getFieldDecorator} = this.props.form;
		// 是否登录header右侧显示不同组件
		const userShow = this.state.isLoged
		? 
		<Menu.Item key="logout" class="register">
			<Button type="primary" htmlType="button">{this.state.nickName}</Button>
			&nbsp;&nbsp;
			<Link target="_blank" to={`/usercenter`}>
				<Button type="dashed" htmlType="button">个人中心</Button>
			</Link>
			&nbsp;&nbsp;
			<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
		</Menu.Item>
		: 
		<Menu.Item key="register" class="register">
			<Icon type="user"/>注册/登录
		</Menu.Item>;

		return(
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="" class="logo">
							<img src="./images/logo.png" />
							<span>明日头条</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
							<Menu.Item key="top">
								<Icon type="dot-chart" />热点
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="copy" />社会
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="global" />国内
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore" />体育
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="rocket" />科技
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="hourglass" />娱乐
							</Menu.Item>
							<Menu.Item key="shenghuo">
								<Icon type="coffee" />生活
							</Menu.Item>
							{userShow}
						</Menu>

						<Modal title="用户中心" wrapClassName="vertical-center-modal" footer={null} visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)}>
							<Tabs type="card" onChange={this.callback.bind(this)}>

								<TabPane tab="登录" key="1">
									<Form horizontal onSubmit={this.login.bind(this)}>
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

					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		);
	};
}


export default PCHeader = Form.create({})(PCHeader);