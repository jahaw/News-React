import React from 'react';
import MBHeader from './mbComponents/header.js';
import MBFooter from './mbComponents/footer.js';
import MBList from './mbComponents/list.js';
import {Tabs,Carousel} from 'antd';
const TabPane = Tabs.TabPane;

export default class MBIndex extends React.Component {
	render(){

		const settings = {
			dots:true,
			infinite:true,
			speed:1000,
			slidesToShow:1,
			autoplay:true,
		};

		return(
			<div>
				<MBHeader></MBHeader>
				<Tabs>
					<TabPane tab="热点" key="1">
						<div class="carousel">
							<Carousel {...settings}>
								<div><img src="./images/slide_1.jpg" /></div>
								<div><img src="./images/slide_2.jpg" /></div>
								<div><img src="./images/slide_3.jpg" /></div>
								<div><img src="./images/slide_4.jpg" /></div>
								<div><img src="./images/slide_5.jpg" /></div>
							</Carousel>
						</div>
						<MBList count={20} type="top" />
					</TabPane>
					<TabPane tab="社会" key="2">
						<MBList count={20} type="shehui" />
					</TabPane>
					<TabPane tab="娱乐" key="3">
						<MBList count={20} type="yule" />
					</TabPane>
					<TabPane tab="国内" key="4">
						<MBList count={20} type="guonei" />
					</TabPane>
					<TabPane tab="国际" key="5">
						<MBList count={20} type="guoji" />
					</TabPane>
				</Tabs>
				<MBFooter></MBFooter>
			</div>
		);
	};
}