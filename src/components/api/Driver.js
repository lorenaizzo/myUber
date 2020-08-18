import axios  from 'axios';

export async function saveDriver(driver) {

    try{
        let response;
        // Descomentar esta linea de abajo y comentar la siguiente para 
        // probar la aplicacion contra el servidor real
        
        // response = await axios.post('https://viapool.com/driver', driver);
        response = await axios.post("https://httpbin.org/post", driver);        

        if(response){
            return true;
        }
        else {
            return false;
        }
    }
    catch(e) {
        console.log('Error al conectar con el server. El error es el siguiente: ', e);
    }
}


