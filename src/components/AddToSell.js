import React, { Component } from 'react';
import {Button,Form,FormGroup,Label,Input, FormText} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import { auth,firestore,storage } from '../firebase/firebase';

class AddToSell extends Component{
    constructor(props)
    {
        super(props);

        this.state={
            name: "",
            image: "",
            category: "",
            label: "new",
            price: "",
            featured: false,
            description: "",
            url: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    uploadImage() {
        if(auth.currentUser != null){
        console.log(this.state.image);

        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
            (snapshot) => {
            
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress});
            }, 
            (error) => {
                
                console.log(error);
            }, 
             () => {
            
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
               this.setState({ url: url}, () => {
                
                 
                });
            })
        });
    }
    else{
        window.open('/error');
    }
}

    handleChange1 (event) {
        console.log(this.state.image);
        if (event.target.files[0]) {
        const image = event.target.files[0];
        this.setState(() => ({image}));
         }
         this.setState({url: ''}, () => console.log(this.state.image));
    
   }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
 }
    handleSubmit(event) {
    
        if(auth.currentUser!=null){
          
            console.log(this.state);
            firestore.collection('items')
            .add({
            name: this.state.name.toString(),
            price: this.state.price.toString(),
            category: this.state.category.toString(),
            label: this.state.label.toString(),
            featured: this.state.featured,
            description: this.state.description.toString(),
            image: this.state.url.toString(),
            seller: auth.currentUser.email.toString(),
            
             })
            .then(docRef => {
                console.log(docRef);
            
            });

           this.props.history.push('/success')
    }
    else{
      window.open('/error')
    }

}

    componentDidMount() {
        if(auth.currentUser == null)
           window.open('/error');
    }
    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
            <br />
            <div classname='row m-1' style={{justifyContent: 'center' , alignContent: 'center'}}>
            <h1 style={{justifyContent: 'center' , alignContent: 'center'}}>Want to Sell ?</h1><br />
            <h3>E-Market Welcomes You !</h3>
            </div>
            <hr />
            <div>Add the details and upload the image of the product</div><br />
            <FormGroup className='col-12 col-md-4'>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" 
               placeholder='eg. Iphone 11'
               value={this.state.name}
               onChange={this.handleChange} />
            </FormGroup>
  
            <FormGroup className='col-12 col-md-4'>
              <Label htmlFor="category">Category</Label>
              <Input type="text" id="category" name="category" 
               placeholder='eg. Smartphone'
               value={this.state.category}
               onChange={this.handleChange} />
            </FormGroup>
  
  
            <FormGroup className='col-12 col-md-4'>
              <Label htmlFor="price">Price</Label>
              <Input type="text" id="price" name="price"
              placeholder='in USD'
              value={this.state.price}
              onChange={this.handleChange}/>
            </FormGroup>


            <FormGroup className='col-12 col-md-4'>
              <Label htmlFor="description">Description</Label>
              <Input type="textarea" id="description" name="description"
              placeholder='Details of the item'
              value={this.state.description}
              onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup className='col-12 col-md-4'>
              <Label htmlFor="image">Image</Label>
              <Input type="file" id="image" name="image"
              onChange={this.handleChange1}/>
              <Button onClick={this.uploadImage} color={this.state.url ? 'success' : 'warning'}>{this.state.url ? 'Uploaded' : 'Upload'}</Button>
              <div>Wait for the image to upload before submitting the product. </div>
            </FormGroup>
           
            <FormGroup className='col-12 col-md-4'>
            <Button type="submit" value="submit" color="primary" >Submit Item For Sell</Button>
            </FormGroup>
            </Form>
  
        );
    }
}

export default withRouter(AddToSell);
