import React, { Component } from 'react';
import { getGenres } from "../../services/fakeGenreService";
import { isTemplateElement } from '@babel/types';

const ListGroup = (props) => {
    const {selected, items} = props;
    return ( <ul class="list-group">
       <li className="list-group-item active">All Genres </li>
        {items.map(item => <li key={item._id} class={item === selected ? "list-group-item active" : "list-group-item"}>{item.name}</li>)}
    </ul> );
}
 

export default ListGroup   ;