import React from 'react';
import {Col,Row,Tabs,Carousel} from 'antd';
import NewsBlock from './news_block.js';
import NewsImgBlock from './news_img_block.js';
import RightBox1 from './rightBox1.js';
import RightBox2 from './rightBox2.js';
const TabPane = Tabs.TabPane;


export default class PCNewsBOx extends React.Component{
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
				<Row>
					<Col span={2}></Col>
					<Col span={20} class="box">
						<div class="leftBox">
							<div class="carousel">
								<Carousel {...settings}>
									<div><img src="./images/slide_1.jpg" /></div>
									<div><img src="./images/slide_2.jpg" /></div>
									<div><img src="./images/slide_3.jpg" /></div>
									<div><img src="./images/slide_4.jpg" /></div>
									<div><img src="./images/slide_5.jpg" /></div>
								</Carousel>
							</div>
							<NewsImgBlock count={6} type="guoji" width="400px" cardTitle="热点头条" imageWidth="120px" />
						</div>
						<Tabs class="tabs_news">
							<TabPane tab="科技" key="1">
								<NewsBlock count={20} type="keji" width="100%" />
							</TabPane>
							<TabPane tab="国际" key="2">
								<NewsBlock count={20} type="guoji" width="100%" />
							</TabPane>
							<TabPane tab="社会" key="3">
								<NewsBlock count={20} type="shehui" width="100%" />
							</TabPane>
							<TabPane tab="体育" key="4">
								<NewsBlock count={20} type="tiyu" width="100%" />
							</TabPane>
							<TabPane tab="新闻" key="5">
								<NewsBlock count={20} type="top" width="100%" />
							</TabPane>
						</Tabs>
						<Tabs>
							<TabPane tab="一问易答" key="1">
								<RightBox1 />
							</TabPane>
							<TabPane tab="曝光台" key="2">
								<RightBox2 />
							</TabPane>
						</Tabs>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		);
	}
}