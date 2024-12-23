
const language = navigator.language.substring(0,2);
export default class FlowerService {

    

    private static BASE_URL = `/${language}`;

    static async getFlowers():Promise<Flower[]>{
        const response = await fetch(`${this.BASE_URL}/api/flowers`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            },
        });

        if(!response.ok) {
            throw new Error(`Failed to fetch flowers: ${response.statusText}`);
        }

        return response.json();
    }
}