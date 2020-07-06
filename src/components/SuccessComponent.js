import React, {Component} from 'react';
import Image from 'react-bootstrap/Image'
import { Button } from 'reactstrap';
import { withRouter} from 'react-router-dom';

class Success extends Component{
    constructor(props)
    {
        super(props);
    }
    onClick()
    {
        this.props.history.push('/menu');
    }
    render()
    {
        return(
            <div className='container'>
                <div className='row'>
            <Image src = 'https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images2%2FWeb%201920%20%E2%80%93%201.png?alt=media&token=23b03fba-dedc-4a06-8e49-c39eb8a1fecf' fluid /></div>
            <div className='row'>
                <div className='col-12 col-md-3 offset-3 offset-md-5 mt-1'>
            <Button  color='primary' onClick={() => this.onClick} >Go Back To Menu</Button>
            </div>
            </div>
            </div>
        );
    }
}

export default Success;