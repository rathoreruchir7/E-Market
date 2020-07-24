import React, {Component} from 'react';
import {Nav,NavItem,Navbar,NavbarBrand,NavbarToggler,Collapse,Jumbotron, ModalHeader, ModalBody,Button,Modal, FormGroup,Form,Label,Input} from 'reactstrap';
import {withRouter, Link} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { auth,provider } from '../firebase/firebase';

class Header extends Component{
	constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen: false,
          isModalOpen1: false,
          validCredential: true,
          user: '',
          hidden: true
          
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
        this.googleSignInHandle=this.googleSignInHandle.bind(this);
      }

   
	toggleNav()
	{
		this.setState({isNavOpen : !this.state.isNavOpen},() => console.log(this.state.isNavOpen));
  }
  
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  toggleModal1() {
    this.setState({
      isModalOpen1: !this.state.isModalOpen1
    });
  }
 
  handleLogin(event)
  {
    
    this.toggleModal();
    // alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember: " + this.remember.checked);
    this.setState({ validCredential: true});
    var email= this.username.value.toString();
    console.log(typeof(email));
  
    var password = this.password.value.toString();
    console.log(password);
    console.log(typeof(password));
  
    auth.signInWithEmailAndPassword(email, password)
    .then((res) =>{ console.log(res);
       this.props.history.push('/home'); })
    .catch(function(error) {
      console.log('cant log in');
      window.open('/error');
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
    console.log(auth.currentUser);
    event.preventDefault();
    
 }
 
 componentWillMount() {
   console.log('ruchir');
    setTimeout(() => {
      this.setState({hidden: false})
    }, 5000)
 }
 googleSignInHandle(){
        
  auth.signInWithRedirect(provider).then(function(result) {
    if (result.credential) {
      var token = result.credential.accessToken;
      console.log(token);
    }
    var user = result.user;
    console.log(user);
    console.log('after user');
    
   
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
     var email = error.email;
     var credential = error.credential;
     console.log(errorMessage);
     window.open('/error');
  });
this.setState({
  isModalOpen: !this.state.isModalOpen
});
this.props.history.push('/home');

}

  handleLogout()
  {
    auth.signOut().then(function() {
      console.log('sign out user completed')
    }).catch(function(error) {
      console.log('error in sign out');
    });
    this.props.history.push('/home');
  }

	render()
	{ 
    if(!this.state.hidden) {
		return(
			
		  <React.Fragment>	
			<Navbar dark expand="md" style={{position: 'sticky', top: '0'  , zIndex: 10}} className='list-unstyled'>
                    <div className="container" >
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto col-8 col-md-1" href="/"><img src='assets/images/logo.jpg' height="30" width="41" alt='InpireBazarE' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar >
                            <NavItem  onClick={this.toggleNav}>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem  onClick={this.toggleNav}>
                                <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg" ></span> About Us</NavLink>
                            </NavItem>
                            <NavItem  onClick={this.toggleNav}>
                                <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg" ></span> Menu</NavLink>
                            </NavItem>
                            <NavItem  onClick={this.toggleNav}>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg" ></span> Contact Us</NavLink>
                            </NavItem>
                            <NavItem  onClick={this.toggleNav}>
                                <NavLink className="nav-link" to= { auth.currentUser ? '/sellItem' : ''}><span className={ auth.currentUser ? "fa fa-plus fa-lg" : ''}></span>{ auth.currentUser ? 'Add To Sell' : ''}</NavLink>
                            </NavItem>
                            <NavItem  onClick={this.toggleNav}>
                                <NavLink className="nav-link" to= { auth.currentUser ? '/profile' : ''}><span className={ auth.currentUser ? "fa fa-user fa-lg" : ''}></span>{ auth.currentUser ? 'Profile' : ''}</NavLink>
                            </NavItem>
                            <NavItem  onClick={this.toggleNav}>
                                <NavLink className="nav-link" to= { auth.currentUser ? '' : '/signup'}><span className={ auth.currentUser ? "" : 'fa fa-sign-in fa-lg'}></span>{ auth.currentUser ? '' : 'Sign Up'}</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className="" navbar>
                              <NavItem  onClick={this.toggleNav}>
                                <Button outline onClick={auth.currentUser? this.toggleModal1 :this.toggleModal}>
                                    <span className={ auth.currentUser? "fa fa-sign-out fa-lg" : "fa fa-sign-in  fa-lg"}></span>{auth.currentUser ? 'Logut' : 'Login'}
                                </Button>
                              </NavItem>
                            </Nav>
                        </Collapse>
                        
                        <NavItem >
                                <NavLink className="nav-link" to={ this.state.isNavOpen ? '' : '/menu'}><span className={ this.state.isNavOpen ? "" : "fa fa-shopping-basket fa-lg"} ></span> {this.state.isNavOpen ? '' : "Shop Now"}</NavLink>
                        </NavItem>
                        <NavItem >
                                <NavLink className="nav-link" to={ this.state.isNavOpen ? '' : '/myCart'}><span className={ this.state.isNavOpen ? "" : "fa fa-shopping-cart fa-lg"} ></span> { this.state.isNavOpen ? '' : "My Cart"}</NavLink>
                        </NavItem>
                    </div>
                </Navbar>


			<Jumbotron>
			  <div className="container">
			    <div className="row row-header">
			      <div className="col-12 col-sm-6">
			      	<h1>Inspire Bazar-E</h1>
                       <p>Born to shop. Forced to work.</p>
			      </div>
			    </div>
			  </div>

			</Jumbotron>

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
           </Form>
          <Link > </Link>
        </ModalBody>
      </Modal>

      <Modal isOpen={this.state.isModalOpen1} toggle={this.toggleModal1}>
        <ModalHeader toggle={this.toggleModal1}>Are you sure , you want to logout</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleLogout}>
            
           
            <Button type="submit" value="submit" color="primary">Logout</Button>
            
          </Form>
        </ModalBody>
      </Modal>
			</React.Fragment>
			
			);
    }
    else
    {
      return(
         <div className="col-12" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading . . .</p>
        </div>
      );
    }
  
  }
}

export default withRouter(Header);

