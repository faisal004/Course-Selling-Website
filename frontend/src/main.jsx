import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CourseProvider } from "./context/Context";

ReactDOM.createRoot(document.getElementById('root')).render(
  <CourseProvider>
 <React.StrictMode>
    <App />
  </React.StrictMode>,
  </CourseProvider>
 
)
