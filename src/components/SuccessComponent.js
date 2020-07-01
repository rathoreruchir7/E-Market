import React, {Component} from 'react';
import Image from 'react-bootstrap/Image'

class Success extends Component{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div>
            <Image src = 'https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images%2FWeb%201920%20%E2%80%93%201.png?alt=media&token=e0342e95-800e-4624-83eb-804c94722200' fluid />
          
            </div>
        );
    }
}

export default Success;