import React, { Component } from 'react';
import {Button,Form,FormGroup,Label,Input, FormText,FormFeedback, Alert} from 'reactstrap';
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
            url: '',
            touched: {
                name: '',
                category: '',
                price: '',
                description: '',

                
            }
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
           if(this.state.name!='' && this.state.price!='' && this.state.category!='' && this.state.description!='' && this.state.image!='')
           { 
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
            alert('The Form cannot be submitted. Check out if each has been filled :)')
        }
    }
    else{
      window.open('/error')
    }

}
handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
}

validate(name,category,price,description)
{
    const errors = {
       name: '',
       category: '',
       price: '',
       description: ''

    };

    if(this.state.touched.name && name.length==0)
      errors.name='This field is required';

    if(this.state.touched.price && price.length==0)
      errors.price='This field is required';

    if(this.state.touched.category && category.length==0)
      errors.category='This field is required';

    if(this.state.touched.description && description.length==0)
      errors.description='This field is required';

 return errors;
}
    componentDidMount() {
        if(auth.currentUser == null)
           window.open('/error');
    }
    render() {
        const errors = this.validate(this.state.name,this.state.category,this.state.price,this.state.description);
        return (
            <Form onSubmit={this.handleSubmit}>
            <br />
            <div classname='row m-1' style={{justifyContent: 'center' , alignContent: 'center'}}>
            <h1 style={{justifyContent: 'center' , alignContent: 'center'}}>Want to Sell ?</h1><br />
            <h3>Inspire Welcomes You !</h3>
            </div>
            <hr />
            <div>Add the details and upload the image of the product</div><br />
            <FormGroup className='col-12 col-md-4'>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" 
               placeholder='eg. Iphone 11'
               value={this.state.name}
               valid={errors.name === ''}
                invalid={errors.name !== ''}
                onBlur={this.handleBlur('name')}
               onChange={this.handleChange} />
                 <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
  
            <FormGroup className='col-12 col-md-4'>
              <Label htmlFor="category">Category</Label>
              <Input type="text" id="category" name="category" 
               placeholder='eg. Smartphone'
               value={this.state.category}
               valid={errors.category === ''}
               invalid={errors.category !== ''}
               onBlur={this.handleBlur('category')}
               onChange={this.handleChange} />
                 <FormFeedback>{errors.category}</FormFeedback>
            </FormGroup>
  
  
            <FormGroup className='col-12 col-md-4'>
              <Label htmlFor="price">Price</Label>
              <Input type="text" id="price" name="price"
              placeholder='in USD'
              value={this.state.price}
              valid={errors.price === ''}
                invalid={errors.price !== ''}
                onBlur={this.handleBlur('price')}
              onChange={this.handleChange}/>
                <FormFeedback>{errors.price}</FormFeedback>
            </FormGroup>


            <FormGroup className='col-12 col-md-4'>
              <Label htmlFor="description">Description</Label>
              <Input type="textarea" id="description" name="description"
              placeholder='Details of the item'
              value={this.state.description}
              valid={errors.description === ''}
                invalid={errors.description !== ''}
                onBlur={this.handleBlur('description')}
              onChange={this.handleChange}/>
                <FormFeedback>{errors.description}</FormFeedback>
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
