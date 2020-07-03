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
            <Image src = 'https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images%2FproductUploadSuccess.png?alt=media&token=5b550739-2193-4fea-b7d7-89dd66c144d6' fluid />
          
            </div>
        );
    }
}

export default Success;