import React from "react"

import {Navbar} from "./my componenet/Navbar";
import { SearchItem } from "./SearchItem";
import { AddItem } from "./AddItem";
import {Content} from "./my componenet/Content";
import {Footer} from "./my componenet/footer";
import apiRequest from "./apiRequest";

import { useState, useEffect } from "react";


export default function App() {
  const API_URL = 'http://localhost:3500/';
  
  const [items, setItems ] =useState(JSON.parse(localStorage.getItem('shoppinglist')) || [] );
   const[newItem, setNewItem] =useState('')
const[search, setSearch]= useState('')
const [fetchError, setFetchError] =useState(null);
const[isLoading,setIsLoading] = useState(true);



useEffect(() => {
  
  const fetchItems = async () => {
    try {
     const response = await fetch(API_URL);
     if (!response.ok) throw Error('Did not received expected data');
     const listItems = await response.json();
     console.log('Fetched items:', listItems); // Debugging line to check fetched items
     setItems(listItems);
     setFetchError(null);
    } catch (err){
     
      setFetchError(err.message);
     
    }finally {
      setIsLoading(false);
    }
  };
  setTimeout(() => {

 
(async ( )=> await fetchItems())();
}, 2000)

}, []);


 

   const addItem = async (item) => {
   

    const id =items.length ? items[items.length - 1]. id + 1: 1;
    const myNewItem = { id, checked: false, item };
    const listItems =  [...items,myNewItem];
 setItems(listItems);
   
 const postOptions = {
  method : 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(myNewItem),
 }
 const result =  await apiRequest(API_URL, postOptions);
  // if(result) setFetchError(result);
  if (result instanceof Error) {
    setFetchError(result.message);
}
   };

    const handleCheck = async (id) => {
        const listItems = items.map((item) => item.id === id? { ...item,
         checked: !item.checked } : item);
       setItems(listItems);
     
       const myItems = listItems.find((item) => item.id === id);

       const updateOptions = {
        method:' PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({checked: myItems[0].checked}),
       } ;
       const reqUrl = `${API_URL}/${id}`;

       const result = await apiRequest(reqUrl, updateOptions);
      // if (result) setFetchError(result);
      if (result instanceof Error) {
        setFetchError(result.message);
    }
      };
     
     const handleDelete =async (id) => {
       const listItems = items.filter((item)=> item.id  !== id);
     setItems(listItems);
      

     const deleteOptions = { method: 'DELETE'};
     const reqUrl = `${API_URL}/${id}`;
 const result = await apiRequest(reqUrl, deleteOptions);
    //  if (result) setFetchError(result);
    if (result instanceof Error) {
      setFetchError(result.message);
  }
     }
    
     const handleSubmit =(e) => {
      e.preventDefault();
      if (!newItem) return;
    addItem(newItem);
    setNewItem('');
      // addItem
      
     
     };


    return(
          <div>
        <Navbar title="Grocery List"/>
       
       <AddItem
       newItem={newItem}
       setNewItem={setNewItem}
       handleSubmit={handleSubmit}
       />
        <SearchItem
        search={search}
        setSearch={setSearch}
        />
        <main>
          {isLoading && <p>Loading Items...</p>}
          {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
        <Content
        
        items={items.filter(item => ((item.item).toLowerCase()).includes
        (search.toLowerCase()))}
        
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        />)}
     </main>
        <Footer length={items.length}/> {/* Add the Footer component here */}
      
        </div>
       

    );
}




