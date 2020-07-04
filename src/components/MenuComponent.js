import React,{useState,useEffect, Component} from 'react';
import {Card, CardImg, CardText, CardImgOverlay, CardBody, CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import { Loading } from './LoadingComponent';
import Image from 'react-bootstrap/Image';
class  RenderMenuItem extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            hover: false
        }
        this.toggleHover = this.toggleHover.bind(this);
    }
  
    toggleHover()
    {   
        this.setState({hover: !this.state.hover},() => console.log(this.state.hover));
    }
    render(){
   
    var linkStyle;
    if (this.state.hover) {
        linkStyle = {color: '#ed1212',cursor: 'pointer'}
    } else {
        linkStyle = {color: '#000'}
    }
    return(
  
    
   <Card style={linkStyle} onMouseEnter={() => this.toggleHover} onMouseLeave={() =>this.toggleHover}>
       <Link to = {`/menu/${this.props.item.id}`}> 
       <CardImg width="50%" src={this.props.item.image} alt={this.props.item.name} />
     
        <CardImgOverlay>
            <CardTitle>{this.props.item.name}</CardTitle>
        </CardImgOverlay>
      </Link>
   </Card>
   

   
   );

}
}


    

   const Menu = (props) => {
    window.scrollTo(0,0);
        const menu = props.items.items.map((item) => {
            return (
              <div  className="col-12 col-md-5 m-1 image-hover" key={item.id}>
               <RenderMenuItem item={item}  />
              </div>
            );
        });

        if (props.items.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.items.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.items.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }

        else{
            return (
                <div className="container">
                   <div className="row">
                      <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                      </Breadcrumb>
    
                       <div className="col-12">
                       <div className='row col-12 m-1' style={{justifyContent: 'center', alignContent:'center'}}>
                        <h3 className='m-1' style={{color: '#339FFF'}}>FEATURED</h3>
                        </div>
                        <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            style={{width: '1900px' , height: '500px',opacity: '0.8'}}
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
                            <h5>Walk in for the Fashion, Stay in for the Style.</h5>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                             className="d-block w-100"
                             style={{width: '1900px' , height: '400px', opacity: '0.8'}}
                            src='https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images2%2FOnePlus-TV-Launch-banner-3rd-July-1365x260.jpg?alt=media&token=f1cbfaef-ee84-4cf7-b9c5-6ab19b72cad8'
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
                             style={{width: '1900px' , height: '500px', opacity: '0.6'}}
                            src='https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images2%2Fshopping-beautiful-women-wearing-glasses-with-colorful-paper-bags-yellow_1150-19177.jpg?alt=media&token=9529d6c8-0d49-419f-98fc-462e56318e51'
                            alt="Third slide"
                            />
                              <Carousel.Caption>
                            <h3>Majestic Looks</h3>
                            <h4>You are made to Kill.</h4>
                            </Carousel.Caption>
                        </Carousel.Item>

                        
                        </Carousel>
                       </div>
                    </div>
                    <hr />
                    <div className='row col-12 m-1' style={{justifyContent: 'center', alignContent:'center'}}>
                        <h3 className='m-1'>OUR</h3><h3 className='m-1' style={{color: '#339FFF'}}>PRODUCTS</h3>
                        </div>
                       <div className='row' style={{justifyContent: 'center', alignContent:'center'}}>
                       <div className='m-1' style={{height:'2px',width: '20px' ,borderWidth :'2px', color: 'gray', backgroundColor : 'gray', justifyContent: 'center', alignContent:'center'}} ></div>
                        <span style={{height: '25px',
                                        width: '25px',
                                        backgroundColor: '#339FFF',
                                        borderRadius: '50%',
                                        display: 'inline-block',}}></span>
                        <div className='m-1' style={{height:'2px',width: '20px' ,borderWidth :'2px', color: 'gray', backgroundColor : 'gray'}} ></div>
                        </div>
    
                    <div className="row m-1">
                      
                        {menu}
                    </div>
                </div>
            );
        }
        
    }


export default Menu;