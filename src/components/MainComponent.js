import React, { Component } from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import Header from './Header';
import Home from './HomeComponent';
import imageUpload from './imageupload';
import Footer from './FooterComponent';
import Error from './ErrorComponent';
import Itemdetail from './ItemdetailComponent';
import Login from './LoginComponent';
import SignUp from './SignUpComponent';
import Profile from './ProfileComponent';
import AddToSell from './AddToSell';
import {Switch, Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFirebase} from 'react-redux-firebase';
import {getFirestore} from 'redux-firestore';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { postComment,postFeedback,fetchItems,fetchComments,fetchPromos, fetchLeaders,fetchUser } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import firebase from 'firebase';
import { firestore,fireauth,auth} from '../firebase/firebase';
const mapDispatchToProps = dispatch => ({
  
  postComment: (itemId, rating, comment) => dispatch(postComment(itemId, rating, comment)),
  postFeedback: (firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
  fetchItems: () => { dispatch(fetchItems())},
  fetchUser: (username) => { dispatch(fetchUser(username))},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => { dispatch(fetchComments())},
  fetchPromos: () => { dispatch(fetchPromos())},
  fetchLeaders: () => { dispatch(fetchLeaders())}


});



const mapStateToProps=state=>{
  return{
    items:state.items,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders,
    user: state.user
   };
}
class Main extends Component {
  constructor(props) {
    super(props);
      this.state = {
        user: null
      }
  }
 
  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchComments();
    // this.props.fetchPromos();
    // this.props.fetchUser();
    // this.props.fetchLeaders();
    console.log('i am in');
    auth.onAuthStateChanged( user => {
      if (user) {
        console.log(user);
       this.setState({user: user}, () => {
      
        console.log(this.state.user)
        console.log(auth.currentUser);
       });
    }
    else
    console.log('not user changed');
    });
  }
  
   render() {
    const HomePage = () =>{
    return( <Home 
              item={this.props.items.items}
              itemsLoading={this.props.items.isLoading}
              itemsErrMess={this.props.items.errMess}
             

          />);
    }

    
   const ItemWithId = ({match}) =>
  {
    return(
        <Itemdetail item={this.props.items.items.filter((item) => item.id === (match.params.itemId))[0]} 
            isLoading={this.props.items.isLoading}
            errMess={this.props.items.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.itemId === (match.params.itemId))} 
            commentsErrMess={this.props.comments.errMess} 
            postComment={this.props.postComment}/>
      );
  };

  const AboutUs = () =>
  {
    return (
        <About leaders={this.props.leaders.leaders} 
        leadersLoading={this.props.leaders.isLoading}
        leadersErrMess={this.props.leaders.errMess}
       />
      );
  };
  
  
  const ProfilePage = () =>
  { 
    
    return (
        <Profile  
        

       />
      );
  
  }
  return (
   
    <div>
    <Header />
      <TransitionGroup>    
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <div>
             <Switch>
              <Route path='/signup' component={() => <SignUp user = {this.state.user}  />  } />
              <Route path='/home' component={HomePage} />
              <Route path='/login' component={() => <Login fetchUser={this.props.fetchUser} />} />
              <Route path = '/profile' component={ProfilePage} />
              <Route exact path='/menu' component={() => <Menu items={this.props.items} />} />
              <Route path = '/menu/:itemId' component = {ItemWithId} />
             
              <Route exact path = '/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} /> 
              <Route exact path = '/aboutus' component  = {AboutUs} />
              <Route exact path = '/sellItem' component  = {AddToSell} />

              
              <Route exact path = '/error' component  = {Error} />
              <Redirect to = '/home'/>
              </Switch>
           </div>
           </CSSTransition>
      </TransitionGroup>
      
    <Footer />
    </div>
        

  );
}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
