import React,{Component} from 'react';
import {Breadcrumb,BreadcrumbItem,Button,Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        
   }

  handleSubmit(values) {
        
        this.props.postFeedback(values.firstname,values.lastname,values.telnum,
                                    values.email,values.agree,values.contactType,values.message);
        
        this.props.resetFeedbackForm();
        // event.preventDefault();
    }
    render(){

        
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>                
                </div>
    
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            343, Drainer Avenue<br />
                            Tallahasee,Florida<br />
                            United States of America<br />
                            <i className="fa fa-phone"></i>: +98 1234 5678<br />
                            <i className="fa fa-fax"></i>: +980 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:emarket@shop.net">emarket@shop.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                      
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:emarket@shop.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>

               
            </div>
        );
    }
    
}

export default Contact;