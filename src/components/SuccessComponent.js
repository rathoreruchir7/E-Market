import React, {Component} from 'react';
import Image from 'react-bootstrap/Image'
import { Button } from 'reactstrap';
import { withRouter} from 'react-router-dom';

class Success extends Component{
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount()
    {
        window.scrollTo(0,0);
    }
    handleClick()
    {   console.log('hello');
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
            <Button  color='primary' onClick={this.handleClick} >Go Back To Menu</Button>
            </div>
            </div>
            </div>
        );
    }
}

export default withRouter(Success);