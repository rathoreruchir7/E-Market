import React, {Component} from 'react';

import {Nav,NavItem,Navbar,NavbarBrand,NavbarToggler,Collapse,Jumbotron, ModalHeader, ModalBody,Button,Modal, FormGroup,Form,Label,Input} from 'reactstrap';
import {Switch, Route,Redirect} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { auth,firestore, firebasestore,provider } from '../firebase/firebase';



class Login extends Component{
    constructor(props) {
        super(props);
         
        this.state= {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
      }
    
      handleLogin(event) {
        console.log(this.state);
        auth.signInWithEmailAndPassword(this.state.username.toString(),this.state.password.toString())
        .catch(function(error) {
       
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });

          event.preventDefault();
      }

      googleSignInHandle(){
        
           auth.signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });

      }
    render()
    {
        return (
          <Form onSubmit={this.handleLogin}>
          <FormGroup className='col-12 col-md-4'>
            <Label htmlFor="username">Username</Label>
            <Input type="email" id="username" name="username" 
            value={this.state.username}
             innerRef = {(input) => this.username=input}
             onChange={this.handleInputChange} />
          </FormGroup>
          <FormGroup className='col-12 col-md-4'>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password"
            innerRef = {(input) => this.password=input}
            value={this.state.username}
            onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup className='col-12 col-md-4' check>
            <Label check>
              <Input type="checkbox" name="remember" 
               innerRef = {(input) => this.remember=input}/>Remember Me</Label>
          </FormGroup>
          <Button type="submit" value="submit" color="primary">Login</Button>
      
        </Form>
         
        );
    }
}

export default Login;