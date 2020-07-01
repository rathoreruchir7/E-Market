import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {

    renderDish({image, name, description}) {
        
        return (
            <Card>
                <CardImg top src={image} alt={name} />
                <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardText>{description}</CardText>
                </CardBody>
            </Card>  
        )
    }

    renderComments({id, comment, author, date}) {
        const commentDate = new Date(date);
        
        return (
            <ul key={id} className = "list-unstyled">
                <li className="text-left mb-3">{comment}</li>
                <li className="text-left mb-3">--{author}, {commentDate.toDateString().slice(4)}</li>
            </ul>
        )
    }

    render() {        
        const { dish } = this.props;        
        
        if(dish != null) {
            return (
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                            <h4 className="text-left mb-2">Comments</h4>
                            {dish.comments.map(comment => this.renderComments(comment)) }                                                        
                    </div>            
              </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
       
}

export default DishDetail;