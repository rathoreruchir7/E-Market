import React,{Component} from 'react';
import {Switch, Route,Redirect} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import {FadeTransform} from 'react-animation-components';
import { render } from '@testing-library/react';
import {firestore} from '../firebase/firebase';






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
		console.log(item);
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


function Home(props)
{		


	return(
		<div className="container">
			<div className="row align-items-start">
				<div className="col-12 col-md m-1">
				  <RenderCard item={props.item[2]} isLoading={props.itemsLoading} errMess={props.itemsErrMess}/>
				</div>

				<div className="col-12 col-md m-1">
				  <RenderCard item={props.item[0]}
				   isLoading={props.itemsLoading} 
				   errMess={props.itemsErrMess} />
				</div>

				<div className="col-12 col-md m-1">
				  <RenderCard item={props.item[1]} 
				   isLoading={props.itemsLoading}
				   errMess={props.itemsErrMess}/>
				</div>
			</div>
		</div>
		);
	
}

export default Home;