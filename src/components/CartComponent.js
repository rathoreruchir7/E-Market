import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import {firestore,auth} from '../firebase/firebase';

class Cart extends Component {
    constructor(props)
    {
        super(props);
        this.state ={
            username: '',
            email: '',
            name: '',
            cart: [],
            profileImageUrl: ''
        }


    }

    componentDidMount() {
        console.log(auth.currentUser);

        
       if(auth.currentUser == null)
       {    console.log('knd');
           window.open('/error');
       }
       else{
       firestore.collection('user').get()
       .then(snapshot => {
       let users=[];
       snapshot.forEach(doc => {
       
      const data = doc.data();
      
        if(data.email === auth.currentUser.email){
      console.log('i ma in fetch');
      
       const data = doc.data()
       console.log(data);
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
       console.log('fine');
       })
       .catch(() => console.log('error'));
                                                   
            
    }
    }

    render()
    {
        if(this.state.cart.length != 0)
        {
            return(
                <Stagger in>
                {this.state.cart.map((item) => {
                  return (
                     <Fade in>
                 <div className="col-12 mt-5" key={item.id}>
                         <Media tag="li">
                             <Media left middle>
                                 <Media object src ={item.id} href={`/menu/${item.id}`} alt={item.name} />
                             </Media>    
                             <Media body className="ml-5">
                                 <Media heading>{item.name}</Media>
                                 <p>{item.price}</p>
                                 <p>{item.description}</p>
                             </Media>    
                        </Media>
                         </div>
                         </Fade>
                     );
                 })}
                 </Stagger>
            );
        }

        else{
            return(
                <div>
                    <h3>Nothing in your MyCart. Shop more...</h3>
                </div>
            )
        }
    }
}

export default Cart;