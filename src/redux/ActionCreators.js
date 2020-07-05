import * as ActionTypes from './ActionTypes';

import {baseUrl} from '../shared/baseUrl';
import { user } from './user';
import {firestore, auth,firebasestore} from '../firebase/firebase'


export const addComment=(comment)=>({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (itemId, rating, comment) => (dispatch) => {

    if (!auth.currentUser) {
        console.log('No user logged in!');
        return;
    }

    return firestore.collection('comments').add({
        author:  auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email
        ,
        itemId: itemId,
        rating: rating,
        comment: comment,
        date: new Date().toISOString()
    })
    .then(docRef => {
        firestore.collection('comments').doc(docRef.id).get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    const id = doc.id;
                    let comment = {id, ...data};
                    dispatch(addComment(comment))
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
    })
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}

export const postFeedback=(firstname,lastname,telnum,email,agree,contactType,message) => ()=> {
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }
    

    return fetch(baseUrl + 'feedback',{
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    })

    .then(response=> {
        if(response.ok)
        {
            return response;
        }
        else{
            var error = new Error('Error '+ response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error=> {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {alert(JSON.stringify(response));})
    .catch(error => {console.log('Post feedback ',error.message);
             alert('Your feedback could not be posted\nError: '+error.message)})
        
}

export const fetchItems = () => (dispatch) => {

    dispatch(itemsLoading(true));
    
                                                              
    return  firestore.collection('items').get()
    .then(snapshot => {
        let items= [];
        snapshot.forEach(doc => {
            const data = doc.data()
            const id = doc.id
            items.push({id, ...data });
        });
        return items;
    })
                                                              
         
         
         .then(items => dispatch(addItems(items)))
         .catch(error => dispatch(itemsFailed(error.message)));
};

export const itemsLoading = () => ({
    type: ActionTypes.ITEMS_LOADING
});

export const itemsFailed = (errmess) => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: errmess
});

export const addItems = (items) => ({
    type: ActionTypes.ADD_ITEMS,
    payload: items
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchComments = () => (dispatch) => {

    dispatch(itemsLoading(true));

    return  firestore.collection('comments').get()
    .then(snapshot => {
        let comments= [];
        snapshot.forEach(doc => {
            const data = doc.data()
            const id = doc.id
            comments.push({id, ...data });
        });
        return comments;
    })
   
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));

};

export const fetchUser = (username) => (dispatch) => {

    dispatch(userLoading(true));
    console.log(username);
    return firestore.collection("user")
    .where("email", "==", "sagar231@gmail.com")
    .get()
         .then(response=> {
             if(response.ok)
             {      console.log(response);
                 return response;
             }
             else{
                 var error = new Error('Error '+ response.status + ': ' + response.statusText);
                 error.response = response;
                 throw error;
             }
         },
         error=> {
             var errmess = new Error(error.message);
             throw errmess;
         })
         .then(response => response.json())
         .then(user => dispatch(addUser(user)))
         .catch(error => dispatch(userFailed(error.message)));
};



export const userLoading = () => ({
    type: ActionTypes.USER_LOADING
});

export const userFailed = (errmess) => ({
    type: ActionTypes.USER_FAILED,
    payload: errmess
});

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
});