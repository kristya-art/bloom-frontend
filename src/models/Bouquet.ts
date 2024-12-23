
import Flower from '../models/Flower'
import Vase from '../models/Vase';

interface Bouquet{
    id:number;
    name:string;
    price:number;
    vase:Vase;
    flowerList: Flower[];
    
}

export default Bouquet;

