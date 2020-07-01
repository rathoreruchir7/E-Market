import React, {Component} from 'react';

class Error extends Component{
    constructor(props)
    {
        super(props);
    }
    render()
    {
        return(
            <div>
            <h2>You are not Autherised.</h2>
            <h2>Please Login Or Sign Up</h2>
            </div>
        );
    }
}

export default Error;