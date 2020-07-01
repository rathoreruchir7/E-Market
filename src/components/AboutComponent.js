import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



function About(props) {

return(
    <div className="container">
        
        <div className="row row-content">
            <div className="col-12 col-md-6">
                <h2>About</h2>
                <hr />
                <p>The platform provides users to buy and sellers to sell their products and make their shopping easy.</p>
                
            </div>
            
    </div>
    </div>
);
}
    


export default About;    