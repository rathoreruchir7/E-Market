import React, { Component } from 'react';
import {Card, CardImg, CardText, CardImgOverlay, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,
	Button, Modal, ModalHeader, ModalBody,Label,Col,Row, Form, FormGroup, Input} from 'reactstrap';
import {Link,withRouter} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';

import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { auth,firestore } from '../firebase/firebase';
// import CommentForm from './CommentForm';

import dotenv from 'dotenv';
dotenv.config();

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => val && (val.length<=len); 
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
           
            isModalOpen:false,
            isLoginModalOpen: false
           

        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModal1 = this.toggleModal1.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
       
      
    }
   
    handleSubmit(values)
    {   
        if(auth.currentUser != null) {
           
         this.toggleModal();
         this.props.postComment(this.props.itemId, values.rating, values.comment);
    }
     else
     {
         window.open('/error');
     }
 }
    

    toggleModalDecide() {
        if(!auth.currentUser)
            {
                
                this.toggleModal1();
            }
        else
          this.toggleModal();
      }
    toggleModal()
    {
        this.setState({ isModalOpen: !this.state.isModalOpen});
    }

    toggleModal1()
    {
        this.setState({ isLoginModalOpen: !this.state.isLoginModalOpen});
    }
  
    render(){
        
        return(
            <React.Fragment>
                 <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleModal1}>
                <ModalHeader toggle={this.toggleModal1}>Login</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleLogin}>
                    <FormGroup>
                    <Label htmlFor="username">Email</Label>
                    <Input type="text" id="username" name="username" 
                    innerRef = {(input) => this.username=input}/>
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password"
                    innerRef = {(input) => this.password=input}/>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="remember" 
                        innerRef = {(input) => this.remember=input}/>Remember Me</Label>
                    </FormGroup>
                    <FormGroup>
                    <Button type="submit" value="submit" color="primary">Login</Button>{"    "}
                    <Button type="button" value="googleButton1" color="danger" onClick={this.googleSignInHandle}>Sign In with Google</Button>
                    </FormGroup>
                    <FormGroup>
                    <Link to='/signup'>Not Registered? Sign Up</Link>
                     
                    </FormGroup>
                </Form>
                <Link > </Link>
                </ModalBody>
            </Modal>
            <div>
            <Button outline onClick={ auth.currentUser ? this.toggleModal : this.toggleModal1 }><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="submitCommentModal">
            <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                    <Row className="from-group">
                        <Label htmlFor="rating" md={6}>Rating</Label>                      
                       <Col md={12}>
                        <Control.select model=".rating" name="rating" id="rating"  className="rating"
                             >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                   </Col>
                    </Row>
                    {/* <Row className="form-group">
                        <Label htmlFor="author" md={12}>Your Name</Label>
                        <Col md={12}>
                        <Control.text model=".author"  name="author" id="author" className="author"
                         validators={{required,minLength:minLength(3), maxLength:maxLength(15) }}
                       />
                       </Col>
                       <Col md={12}>
                       <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                        </Col>
                    
                   </Row> */}
                   <Row className="form-group" >
                       <Label htmlFor="comment" md={12}>Comment</Label>
                       <Col md={12}>
                       <Control.textarea model=".comment" name="comment" id="comment" className="comment"  />
                        </Col>
                    </Row>
                    
                     
                    <Button type="submit" color="primary" >Submit</Button>
                </LocalForm>
            </ModalBody>
            </Modal>
            </div>
            </React.Fragment>
        );
    }
}


    // function RenderItem({item})
    class RenderItem extends Component{
        constructor(props)
        {
            super(props);
        this.state={
            cart: [],
            item: this.props.item,
            isIncl: false,
            isModalOpen: false
        }
            this.addToCart = this.addToCart.bind(this);
           this.toggleModal = this.toggleModal.bind(this)
        }
        
        
         
        componentDidMount()
        {   window.scrollTo(0,0);
            console.log(process.env);
            console.log('i ma in fetch');
            firestore.collection('user').get()
            .then(snapshot => {
                
            let users=[];
            snapshot.forEach(doc => {
                 const data = doc.data();
                
               if(data.email === auth.currentUser.email){
                console.log('i ma in fetch');
                console.log(process.env);
                const data = doc.data()
                console.log(data);
               const id = doc.id
               users.push({id, ...data });
               console.log(users[0]);
               this.setState({ cart: users[0].cart}, () => {
                console.log(users[0].description);
                var isItem1 = this.state.cart.filter((item) => {
                    if(item.id === this.props.item.id)
                       return item;
                       
                });
                console.log(isItem1);
                console.log(this.state.isIncl);
                if(isItem1.length!=0)
                  {this.setState({ isIncl: true}); console.log(isItem1.length)}
        
                console.log(this.state.isIncl);
               });
               console.log(this.state.cart);
               }
            });
    
           
        })
          .then((res) => {
            console.log('fine');
           
          })
          .catch(() => console.log('error'));
 }

   toggleModal()
   {
       this.setState({ isModalOpen: !this.state.isModalOpen});
   }
                           
       

        addToCart(item)
        {   console.log(this.state.cart);
            var newcart = this.state.cart;
            newcart.push(item);
            console.log(newcart);
            if(!auth.currentUser)
           { 
            //   window.open('/error');
            this.toggleModal();
         }     
            else{
               
             firestore.collection('user')
             .doc(auth.currentUser.email)
             .update({
                 'cart' : newcart
             })
              
           .then((res) => window.location.reload(true))
           .catch(() => console.log('error'))


            }
        
         }

        removeFromCart(item1)
        {
            console.log('removing');
            
           if(!auth.currentUser)
           {
                // window.open('/error');
                this.toggleModal();
               }     
            else{
                console.log(this.state.cart);
                var newcart = this.state.cart.filter((item) => {
                    if(item.id != item1.id)
                       return item;
                });
                console.log(newcart);
             firestore.collection('user')
             .doc(auth.currentUser.email)
             .update({
                 'cart' : newcart
             })
              
           .then((res) =>{ console.log(res); 
            window.location.reload(true);        
        })
           .catch(() => console.log('error'))
            }
           
        }
 
        render(){
           
        	return(
                <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleLogin}>
                    <FormGroup>
                    <Label htmlFor="username">Email</Label>
                    <Input type="text" id="username" name="username" 
                    innerRef = {(input) => this.username=input}/>
                    </FormGroup>
                    <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password"
                    innerRef = {(input) => this.password=input}/>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="remember" 
                        innerRef = {(input) => this.remember=input}/>Remember Me</Label>
                    </FormGroup>
                    <FormGroup>
                    <Button type="submit" value="submit" color="primary">Login</Button>{"    "}
                    <Button type="button" value="googleButton1" color="danger" onClick={this.googleSignInHandle}>Sign In with Google</Button>
                    </FormGroup>
                    <FormGroup>
                    <Link to='/signup'>Not Registered? Sign Up</Link>
                     
                    </FormGroup>
                </Form>
                <Link > </Link>
                </ModalBody>
            </Modal>
		     <div className="col-12 col-md-5 m-1">
                 <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                  <Card>
                    <div className='image-hover'><CardImg top src={this.props.item.image} alt={this.props.item.name} /></div>
                    <CardBody>
                    <CardTitle>{this.props.item.name}</CardTitle>
                    <CardTitle>${this.props.item.price}</CardTitle>
                    <CardText>{this.props.item.description}</CardText>
                    
                   
                    </CardBody>

                 </Card>
            <Button type='button' color= {this.state.isIncl ? 'success' : 'danger'} onClick={() => { this.state.isIncl ? this.removeFromCart(this.props.item) : this.addToCart(this.props.item)}}>{this.state.isIncl ? 'REMOVE FROM CART' : 'ADD TO CART' }</Button>
                </FadeTransform>
              </div>
              </React.Fragment>
				);
	
}
    }
	function RenderComments({comments,itemId,postComment})
	{
		
		if(comments!=null){
		return(

			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
			<ul className="list-unstyled">
            <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
            </Stagger>
            </ul>
			
			<CommentForm itemId={itemId} postComment={postComment}/>
			</div>);
		}
		else
		{
			return(
			<div></div>);
		}
	}
	const Itemdetail = (props) => {
        
        if (props.isLoading) {
            console.log(props.item);
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            console.log(props.item);
            return(

                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        else if(props.item !=null){
           
		return(
			
			<div className ="container">

				<div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.item.name}</BreadcrumbItem>
                    </Breadcrumb>
                    </div>
                    <div className="row">
                    <div className="col-12">
                        <h3>{props.item.name}</h3>
                         <hr />
                    </div>             
                    </div>   
                
                
				<div className="row">
					
					<RenderItem item={props.item} />

				   <RenderComments comments = {props.comments} 
                            postComment={props.postComment}
                            itemId={props.item.id}
                                     />
				
			</div>
			</div>
				
		);
	}

	else
	{
    return(
        <div></div>
        );
    }
}


export default withRouter(Itemdetail); 