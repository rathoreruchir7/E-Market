import React, {Component} from 'react';
import {Nav,NavItem,Navbar,NavbarBrand,NavbarToggler,Collapse,Jumbotron, ModalHeader, ModalBody,Button,Modal, FormGroup,Form,Label,Input} from 'reactstrap';
import { firebaseConfig } from '../firebase/config';
import { firestore,fireauth,auth} from '../firebase/firebase';
import { Link, useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom' 
import firebase from "firebase/app";


 
class SignUp extends Component{
    constructor(props) {
        super(props);
         
        this.state= {
           name: '',
           email: '',
            username: '',
            password: '',
            image: '',
            url: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.nextFunc = this.nextFunc.bind(this);
        this.resetState = this.resetState.bind(this);
    }
 
    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
      }

      resetState()
      {
          this.setState({ username: '', password: '', firstname: '', lastname: ''});
      }

  componentDidMount() {
    console.log(this.props.user);
     }


  handleSignUp(event) {

        console.log('i am in sign up');
        console.log(this.state.username); console.log(this.state.password);
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res);   
            })
      .then((res) => console.log('doc written'))
      .catch(() => console.log('error'));
       
      console.log('going to make doc');
       console.log(this.state);

      firestore.collection('user')
      .doc(this.state.email.toString())
      .set({
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        cart: [],
        profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images%2Fdefault-user-image.png?alt=media&token=667b0dbf-bee8-4d84-927c-12d03a48a0b0'
      })
      
       event.preventDefault();
       this.props.history.push('/home');
                
     }
     handleImageChange(event)
     {
      if (event.target.files[0]) {
        const image = event.target.files[0];
        this.setState(() => ({image}));
      }
     }
     nextFunc()
     {
       console.log('i am in next func');
      firestore.collection("user").doc(this.state.username).set({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.username,
        cart: []
     })
     .then((res) => {
         console.log("Document successfully written!");
         console.log(res);
     })
     .catch(function(error) {
         console.error("Error writing document: ", error);
     });
        
     this.props.history.push("/home");
          
     }
    render()
    {
        return (
          <Form onSubmit={this.handleSignUp}>

          <FormGroup className='col-12 col-md-4'>
            <Label htmlFor="username">Name</Label>
            <Input type="text" id="name" name="name" 
             placeholder='John Smith'
             value={this.state.name}
             onChange={this.handleChange} />
          </FormGroup>

          <FormGroup className='col-12 col-md-4'>
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" name="username" 
             placeholder='john_smith_3'
             value={this.state.username}
             onChange={this.handleChange} />
          </FormGroup>

          <FormGroup className='col-12 col-md-4'>
            <Label htmlFor="lastname">Email</Label>
            <Input type="email" id="email" name="email" 
             placeholder='johnSmith@gmail.com'
             value={this.state.email}
             onChange={this.handleChange} />
          </FormGroup>

          <FormGroup className='col-12 col-md-4'>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password"
            placeholder='*********'
            value={this.state.password}
            onChange={this.handleChange}/>
          </FormGroup>

         
          <FormGroup className='col-12 col-md-4' check>
            <Label check>
              <Input type="checkbox" name="remember" 
               innerRef = {(input) => this.remember=input}/>Remember Me</Label>
          </FormGroup>


          <Button type="submit" value="submit" color="primary">Sign Up</Button>
          {/* <Button type="submit" value="submit" color="warning">Google Sign In</Button> */}
        </Form>
         
        );
    }
}

export default withRouter(SignUp);