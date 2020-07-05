import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import {FadeTransform} from 'react-animation-components';
import Carousel from 'react-bootstrap/Carousel'


function RenderCard({item,isLoading,errMess})
{
	if (isLoading) {
        return(
                <Loading />
        );
    }
    else if (errMess) {
        return(
                <h4>{errMess}</h4>
        );
	}
	else{
		
		return(
			<FadeTransform in
			    transformProps={{
					exitTransform: 'scale(0.5) translateY(-50%)'
				}}>
			<Card>
				<CardImg src={item.image} alt={item.name} />
				<CardBody>
				<CardTitle>{item.name}</CardTitle>
				{item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
				<CardText>{item.description}</CardText>
				</CardBody>
			</Card>
			</FadeTransform>
			);

	}
	
}

class Home extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      hidden: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ hidden: false})
    },2000)
  }
  render()
  {		

 if(!this.state.hidden){
	return(
		<div className="container">
			<Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            style={{width: '1900px' , height: '500px',opacity: '1.0'}}
                            src= 'https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images2%2Fwoman-with-shopping-bags-studio-yellow-background-isolated_1303-14294.jpg?alt=media&token=822bbd3b-f203-441f-be5c-f09451c918aa'
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>Women</h3>
                            <h5>Everyday living. Be unique, be brave, be divine.</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                        
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            style={{width: '1900px' , height: '500px',opacity: '0.8'}}
                            src='https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images2%2Fmen_shopping.jpg?alt=media&token=f6df09a3-1bf1-4ce6-80a2-b4a6c2bfa4f9'
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Men</h3>
                            <h5>You are made to Kill.</h5>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                             className="d-block w-100 col-12 col-md-12 row-10 row-md-2"
                             style={{ width: '1900px' , height: '500px',opacity: '1.0'}}
                            src='https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images2%2F1543925884_landingpage-banner-electronics.jpg?alt=media&token=9ae2debe-7bd1-4a1c-8dcd-58a4ec4d575f'
                            alt="Third slide"
                            />
                              <Carousel.Caption>
                            <h3>Exclusive</h3>
                            <h4>Never Settle</h4>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                             className="d-block w-100"
                             style={{width: '1900px' , height: '500px', opacity: '0.8'}}
                            src='https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images2%2Fshopping-beautiful-women-wearing-glasses-with-colorful-paper-bags-yellow_1150-19177.jpg?alt=media&token=9529d6c8-0d49-419f-98fc-462e56318e51'
                            alt="Third slide"
                            />
                              <Carousel.Caption>
                            <h3>Majestic Looks</h3>
                            <h4>Walk in for the Fashion, Stay in for the Style.</h4>
                            </Carousel.Caption>
                        </Carousel.Item>

                        
                        </Carousel>
			<div className="row align-items-start">
			
				<div className="col-12 col-md m-1">
				  <RenderCard item={this.props.item[3]} isLoading={this.props.itemsLoading} errMess={this.props.itemsErrMess}/>
				</div>

				<div className="col-12 col-md m-1">
				  <RenderCard item={this.props.item[0]}
				   isLoading={this.props.itemsLoading} 
				   errMess={this.props.itemsErrMess} />
				</div>

				<div className="col-12 col-md m-1">
				  <RenderCard item={this.props.item[1]} 
				   isLoading={this.props.itemsLoading}
				   errMess={this.props.itemsErrMess}/>
				</div>
			</div>
		</div>
    );
  }
  else{
    return(<div>Loading...</div>)
  }
	
  }
}
export default Home;