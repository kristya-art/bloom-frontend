import React, { useState, useEffect } from 'react';
import FlowerService from '../services/FlowerService';


import {
    Grid,
    Card,
    CardContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';


const BouquetList: React.FC = () => {
    // State for flowers and bouquets
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [bouquets, setBouquets] = useState<Bouquet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    // State for selected flower
    const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
    const[error, setError] = useState<string|null>(null);

    // Fetch flowers and bouquets (mock example)
    useEffect(() => {
      // Replace with your actual API calls
      
    //   const fetchFlowers = async () => {
    //     const flowerData: Flower[] = [
    //       { id: 1, name: 'Rose', color: 'Red', price: 10 },
    //       { id: 2, name: 'Tulip', color: 'Yellow', price: 8 },
    //     ];
    //     setFlowers(flowerData);
    //   };

      const fetchFlowers = async()=>{
        try{
           setLoading(true);
           setError(null);//clean any previous errors
           const flowerData = await FlowerService.getFlowers();
           setFlowers(flowerData);

        }catch(err){
            setError((err as Error).message || 'An error ocurred while fetching data.')
        }finally{
            setLoading(false);
        }
      }
  
      const fetchBouquets = async () => {
       const flower1: Flower = {id:1, name: 'Rose', color: 'Red', price:3.5};
       const flower2: Flower = {id:2, name: 'Tulip', color: 'Yellow', price:2.5};
       const flower3: Flower = {id:3, name: 'Lily', color: 'White', price:4.0};

       const vase:Vase = {id:1,name:'lady', color:'white',material: 'Porcelain', size: 'Medium',price:25.0};

       const flowerList1: Flower[] =[flower1, flower2];
       const flowerList2: Flower[] = [flower3, flower1];

        const bouquetData: Bouquet[] = [
          { id: 1, name: 'Valentine Special', price: 50 , vase, flowerList:flowerList1},
          { id: 2, name: 'Christmas Delight', price: 60, vase, flowerList:flowerList2 },
        ];
        setBouquets(bouquetData);
      };
  
      fetchFlowers();
      fetchBouquets();
    }, []);
  
    // Add flower to a bouquet (for demonstration)
    const addFlower = () => {
      if (selectedFlower) {
        console.log('Adding flower:', selectedFlower);
        // Handle adding flower logic here
      }
    };
  
    return (
      <div>
        <h1>Bouquet Configurator</h1>
  
        {/* Flower Selector */}
        <FormControl fullWidth>
          <InputLabel>Choose a Flower</InputLabel>
          <Select
            value={selectedFlower?.id || ''}
            onChange={(e) => {
              const flower = flowers.find((f) => f.id === Number(e.target.value));
              setSelectedFlower(flower || null);
            }}
          >
            {flowers.map((flower) => (
              <MenuItem key={flower.id} value={flower.id}>
                {flower.name} ({flower.color}) - ${flower.price}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={addFlower}
          disabled={!selectedFlower}
          style={{ marginTop: '10px' }}
        >
          Add Flower
        </Button>
  
        {/* Display Bouquets */}
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {bouquets.map((bouquet) => (
            <Grid item xs={12} sm={6} md={4} key={bouquet.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{bouquet.name}</Typography>
                  <Typography variant="body2">Price: ${bouquet.price}</Typography>
                  <Typography variant="body2">Type: {bouquet.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };
  
export default BouquetList;