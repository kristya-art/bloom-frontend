import React, { useState, useEffect } from 'react';
import './App.css';

//define flower type
type Flower = {
  id:number;
  name:string;
  color:string;
  price:number;
};


let name: string = 'pilucho';
function App() {

const[flowers, setFlowers] = useState<Flower[]>([]);

const language = navigator.language.substring(0,2);
 

  // Fetch flowers data
  fetch(`/${language}/api/flowers`)
  .then(response => {
      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }
      return response.json();
  })
  .then(data => setFlowers(data))
  .catch(error => console.error('Error fetching flowers:', error));


return (
  <div className="App">
    <header className="App-header">
      <div className="App-intro">
        <h2>JUG List</h2>
       
        {flowers.map((flower) => (
          <div key={flower.id}>{flower.name}</div>
        ))}
      </div>
    </header>
  </div>
);
}

export default App;
