import React , {Component} from 'react';
import { Button } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import { auth,firestore } from '../firebase/firebase';

class Approval extends Component{
    constructor(props)
    {
        super(props);
        this.onClickTransfer = this.onClickTransfer.bind(this);
    }
    
    componentDidMount()
    {
        console.log(auth.currentUser);
        // if(auth.currentUser.email !='rathoreruchir7@gmail.com')
        //   this.props.history.push('/home');
        
    }
    onClickTransfer(event)
    {
        console.log('i have clicked the button');
        firestore.collection('items to be approved').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data()
                  
                    firestore.collection('items')
                      .add( data );
                    doc.ref.delete();
                  
                });
        
    });
    event.preventDefault();
}
    render(){
        return (
            <Button style={{ justifyContent: 'center' , alignContent: 'center'}} onClick={this.onClickTransfer} >Transfer</Button>
        );
    }
}

export default withRouter(Approval);