import React, {Component} from 'react';
import Image from 'react-bootstrap/Image'

class SignUpSuccess extends Component{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div>
            <Image src = 'https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images%2FsignupSuccess.png?alt=media&token=b6269128-27f0-45d3-b089-561b8a155a0b' fluid />
          
            </div>
        );
    }
}

export default SignUpSuccess;