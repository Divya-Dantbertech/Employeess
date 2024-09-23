import React from 'react'
import {FaTrashAlt} from 'react-icons/fa';
import { LineItem } from './LineItem';

export const ItemList = ({items,handleCheck,handleDelete}) => {
  console.log(items)
  return (
    <ul>
    {items.map((item)=> (
     <LineItem
     key={item.id}
       item={item}
       handleCheck={handleCheck}
       handleDelete={handleDelete}
       />
    ))}
  </ul>
  );
};
