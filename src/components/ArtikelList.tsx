import React, { useState, useEffect } from 'react';
import FlowerService from '../services/FlowerService';
import Flower from '../models/Flower';
import Vase from '../models/Vase';
import Artikel from '../models/Artikel';




let lang = navigator.language.substring(0,2);

const ArtikelList:React.FC =()=>{
    const [artikelList, setArtikel] = useState<Artikel[]>([]);

    useEffect(() => {
        fetch(`/${lang}/api/artikel`)
           .then((response)=> response.json())
           .then((data)=> setArtikel(data) );
    },[]);

    return (
     <div>
        <h1>Artikel List</h1>
        <ul>
           {
                artikelList.map((artikel)=>(
                    <li key={artikel.id}>
                        {artikel.arttext}
                    </li>
                ))


           }
        
        
        
        </ul>
     </div>

    );
}

export default ArtikelList;