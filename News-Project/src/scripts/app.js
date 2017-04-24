import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import PCIndex from './components/pc_index.js';
import MBIndex from './components/mb_index.js';
import PCNewsDetails from './components/pcComponents/news_details.js';
import MBNewsDetails from './components/mbComponents/news_details.js';
import PCUserCenter from './components/pcComponents/userCenter.js';
import MBUserCenter from './components/mbComponents/userCenter.js';
import "../styles/app.scss";
import MediaQuery from "react-responsive";

export default class App extends React.Component {
	render(){
		return(
			<div>
				<MediaQuery query='(min-device-width:1224px)'>
					<Router history={hashHistory}>
						<Route path="/" component={PCIndex}></Route>
						<Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
						<Route path="/usercenter" component={PCUserCenter}></Route>
					</Router>
				</MediaQuery>
				<MediaQuery query='(max-device-width:1224px)'>
					<Router history={hashHistory}>
						<Route path="/" component={MBIndex}></Route>
						<Route path="/details/:uniquekey" component={MBNewsDetails}></Route>
						<Route path="/usercenter" component={MBUserCenter}></Route>
					</Router>
				</MediaQuery>
			</div>
		);
	};
}

ReactDOM.render(<App />,document.getElementById('app'));

if (module.hot) {
    module.hot.accept();
};

