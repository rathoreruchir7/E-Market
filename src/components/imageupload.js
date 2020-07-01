import React , {Component} from 'react';
 import {Input,FormGroup,Form,Label} from 'reactstrap';

import {storage} from '../firebase/firebase'
class imageUpload extends Component{
    constructor(props){
        super(props);
        this.state={
            image: '',
            url: ''
        }
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event) {
       console.log('fjgkfg');
       if (event.target.files[0]) {
        const image = event.target.files[0];
        this.setState(() => ({image}));
      }
      console.log(this.state.image);
      }

    handleUpload() {
        console.log(this.state.image);

        const {image} = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        })
    });
    }
    render() {
        return (
            <div>
                 <Form onSubmit={this.handleSignUp}>

<FormGroup className='col-12 col-md-4'>
  <Label htmlFor="image">Name</Label>
  <Input type="file" id="image" name="image" 
   
  
   onChange={this.handleChange} />
</FormGroup>
</Form>
                  <button onClick={this.handleUpload}>imageUpload</button>
            </div>
        );
    }
}

export default imageUpload;