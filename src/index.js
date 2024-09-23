import React from "react"
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';
import './index.css';


// Create a root element
const container = document.getElementById('root');

// Create a root and render the App component
const root = ReactDOM.createRoot(container); 
root.render(<App />);
// ReactDom.render(
//     <React.StrictMode>
//         <App/>
//         </React.StrictMode>,
//         document.getElementById('root')
// );