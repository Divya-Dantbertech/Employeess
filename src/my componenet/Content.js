import React from 'react'
import { ItemList } from './ItemList'; // Ensure the case matches the filename



export const Content = ({items,handleCheck,handleDelete}) => {

  return (
    <>
    {items.length ? (
  <ItemList
      items={items}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />
    ): (
      <p style={{ marginTop: '2rem'}}> your list is empty.</p>
    )}
    </>
    );
  
};
