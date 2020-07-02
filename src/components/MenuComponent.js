import React from 'react';
import {Card, CardImg, CardText, CardImgOverlay, CardBody, CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';
function RenderMenuItem({item,onClick})
{ return(
  

   <Card >
       <Link to = {`/menu/${item.id}`}> 
        <CardImg width="100%" src={item.image} alt={item.name} />
        <CardImgOverlay>
            <CardTitle>{item.name}</CardTitle>
        </CardImgOverlay>
      </Link>
   </Card>

   
   );
}

    

   const Menu = (props) => {
        const menu = props.items.items.map((item) => {
            return (
              <div  className="col-12 col-md-5 m-1" key={item.id}>
               <RenderMenuItem item={item}  />
              </div>
            );
        });

        if (props.items.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.items.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.items.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }

        else{
            return (
                <div className="container">
                   <div className="row">
                      <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                      </Breadcrumb>
    
                       <div className="col-12">
                        <h3>Menu</h3>
                        
                       </div>
                    </div>
    
    
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
        }
        
    }


export default Menu;