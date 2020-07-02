import React, { Component,useContext } from 'react';

import { Media, Input } from 'reactstrap';
import Image from 'react-bootstrap/Image'
import {Card, CardImg, CardText,Col, CardImgOverlay,CardBody, CardTitle, Button,ModalHeader, ModalBody,Modal} from 'reactstrap';
import {Link} from 'react-router-dom';

import { storage,firestore,auth } from '../firebase/firebase';
import { FadeTransform } from 'react-animation-components';





function RenderMenuItem({item,onClick})
{ return(
  

   <Card >
       <Link to = {`/menu/${item.id}`}> 
        <CardImg width="100%" src={item.image} alt={item.name} />
        <CardImgOverlay>
            <CardTitle>{item.name}</CardTitle>
        </CardImgOverlay>
        <CardBody></CardBody>
      </Link>
   </Card>

   
   );
}


class RenderItem extends Component{
    constructor(props)
    {
        super(props);
    this.state={
        cart: [],
        item: this.props.item
    }
        this.addToCart = this.addToCart.bind(this);

    }

    componentDidMount()
    {
        
                                                         
          
   }


    addToCart(item)
    {   console.log(this.state.cart);
        var newcart = this.state.cart;

        newcart.push(item);
        console.log(newcart);
        if(!auth.currentUser)
        console.log('user not logged in');
 
        else{
           
         firestore.collection('user')
         .doc(auth.currentUser.email)
         .update({
             'cart' : newcart
         })
          
       .then((res) => console.log(res))
       .catch(() => console.log('error'))
        }
    }
    render(){

           
		return(
		     <div className="col-12 col-md-5 m-1">
                 <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                  <Card>
                    <CardImg top src={this.props.item.image} alt={this.props.item.name} />
                    <CardBody>
                    <CardTitle>{this.props.item.name}</CardTitle>
                    <CardText>{this.props.item.description}</CardText>
                    </CardBody>

                 </Card>
               
                </FadeTransform>
              </div>
				);
	}

}

class Profile extends Component{
    constructor(props)
    {
        super(props);

        this.state={
            profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images%2Fdefault-user-image.png?alt=media&token=667b0dbf-bee8-4d84-927c-12d03a48a0b0',
            username: '',
            name: '',
            email: '',
            image: '',
            cart: [],
            image: '',
            isModalOpen: false
            
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    
    }

    
   
   componentDidMount()
   {
       if(auth.currentUser == null)
        {
            window.open('/error');
        }
        else{
  
        this.setState({ name: auth.currentUser.displayName, username: auth.currentUser.email, email: auth.currentUser.email});
        firestore.collection('user').get()
        .then(snapshot => {
            
        let users=[];
        snapshot.forEach(doc => {
        
       const data = doc.data();
       
         if(data.email === auth.currentUser.email){
      
       
        const data = doc.data()
      
        const id = doc.id
        users.push({id, ...data });
        console.log(users[0]);
        this.setState({ username: users[0].username, name: users[0].name,profileImageUrl: users[0].profileImageUrl, email: users[0].email, cart: users[0].cart },() => {
            console.log(this.state);
        });
            console.log(this.state.cart);
            console.log(this.state);
            }
        });
        })
        .then((res) => {
           //
        })
        .catch(() => console.log('error'));
                                                    
             
     }
    }
     toggleModal() {
         this.setState({ isModalOpen: !this.state.isModalOpen});
     }

     uploadImage() {
       

        const {image} = this.state;
        if(image != '')
        {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
            (snapshot) => {
            
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress});
            }, 
            (error) => {
                
                console.log(error);
            }, 
             () => {
            
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
               this.setState({ profileImageUrl: url}, () => {
                
                 firestore.collection("user").doc(this.state.email.toString()).update({
                    profileImageUrl: this.state.profileImageUrl
                });
                });
            })
        });
    }
   else{
       this.setState({ profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images%2Fdefault-user-image.png?alt=media&token=667b0dbf-bee8-4d84-927c-12d03a48a0b0'})
   }
}


     handleChange (event) {
            console.log(this.state.image);
            if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({image}));
             }
             else{
                 this.setState({image: ''});
             }
        console.log(this.state.image);
       }

    render(){

       

        if(auth.currentUser == null){
            console.log('user not logged in');
            return(
             <div></div>
         );
         }

         else{
            const menu = this.state.cart.map((item) => {
                return (
                  <div  className="col-12 col-md-5 m-1" key={item.id}>
                   <RenderMenuItem item={item}  />
                  </div>
                );
            });

             console.log(this.props.user);

             return(
                <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Profile image</ModalHeader>
                <ModalBody>
                    <Image style={{width: '200px', height: '200px'}} src={this.state.profileImageUrl}  fluid />
                  </ModalBody>
                  <Input type="file" id="image" name="image"  onChange={this.handleChange} />
                  <Button type="button" value="button" color='primary' onClick={this.uploadImage}>Change Profile Image</Button>
              </Modal>


                 <div className='container'>
                    <div className="row">
                        <div className="col-12 col-md-2 mt-5"  >
                          <Image style={{width: '200px', height: '200px'}} src={this.state.profileImageUrl}  rounded />
                        </div>
                        <div className="col-12 col-md-2 mt-5 offset-md-1"  >
                            <Media heading>{this.state.name}</Media>
                     
                    
                          <Button type="button" value="button1" color='primary' onClick={this.toggleModal}>Change Profile Image</Button>
                        </div>
                                   
                    </div>  
                    <hr />
               
                <div className="col-12 mt-5" >
                        <Media >
                            <Media left middle>
                                <Media  alt={this.state.name} />
                            </Media>    
                            <Media body className="ml-5">
                                <Media heading>{this.state.name}</Media><br />
                                 <p><h6>Username</h6>{this.state.username}</p><br />
                                <p><h6>Email</h6>{this.state.email}</p>
                            
                            </Media>    
                       </Media>
                        </div>
                        <hr />

                <div className='row'>
                    <div className='col-12 col-md-4'>
                        <h4>{ this.state.cart.length ? 'My Cart' :'No items to show in Cart'}</h4>
                        {menu}
                     </div>
                 </div> 
                 </div>
            </div>
             );
         }
    } 
}



export default Profile;

