import React, {Component} from 'react';
import Image from 'react-bootstrap/Image'

class NotFound extends Component{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div>
            <Image src = 'https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images%2FWeb%201920%20%E2%80%93%201.png?alt=media&token=1f122a05-21d5-451a-9846-5a4bd92e6619' fluid />
          
            </div>
        );
    }
}

export default NotFound;