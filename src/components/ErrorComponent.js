import React, {Component} from 'react';
import Image from 'react-bootstrap/Image'

class Error extends Component{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div>
             <Image src="https://firebasestorage.googleapis.com/v0/b/newproject-f4730.appspot.com/o/images%2Ferror401.jpg?alt=media&token=94ce7221-4bfd-4f75-81a6-665f70ab4d0d" fluid />
            </div>
        );
    }
}

export default Error;