import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,FormFeedback,Label,Input,Col,Row} from 'reactstrap';

import {LocalForm,Control,Errors} from 'react-redux-form';
const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false,
           author: '',
            rating:'',
            commment:'',
            touched:{
                author:''
            }

        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }
    handleSubmit(values)
    {
        alert('Current State is: ' + JSON.stringify(values));
    }
    validate(name)
    {
        const errors = {
           author: ''
        };

        if(this.state.touched.author && name.length<=2)
          errors.author='Must be greater than 2 characters';
        else if(this.state.touched.author && name.length>15)
        errors.author='Must be 15 characters or less';
          return errors;
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

    render(){
        const errors = this.validate(this.state.author);
        return(
            <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="rating">Rating</Label>                      
                       
                        <Input type="select" name="rating" id="rating" md={10}  onChange={this.handleInputChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                   
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="author">Your Name</Label>
                        <Input type="text"  name="author" id="author" 
                        valid={errors.author === ''}
                        invalid={errors.author !== ''}
                       onBlur={this.handleBlur('author')}
                       onChange={this.handleInputChange}
                       />
                        <FormFeedback>{errors.author}</FormFeedback>
                   </FormGroup>
                   <FormGroup >
                       <Label htmlFor="comment">Comment</Label>
                       <Input type="textarea" name="comment" id="comment"  onChange={this.handleInputChange}/>
                    </FormGroup>
                    
                     
                    <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </ModalBody>
            </Modal>
            </div>
        );
    }
}
export default CommentForm; 