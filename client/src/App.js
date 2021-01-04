import React, { useEffect } from 'react'
import axios from 'axios'
import './App.css';
import getHeaders from './components/Utils/getHeaders'

function App() {

  useEffect(() => {
    axios.get('api/gallery', {headers: getHeaders()})
      .then(console.log)
      .catch(console.log)
  })

  return (
    <div>
      Hello
    </div>
  );
}

export default App;
