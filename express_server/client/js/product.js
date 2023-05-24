import { fetchUser } from "./config/http/fetchUser.js";
import { httpClient } from "./config/http/httpClient.js";


export class Product{


    getProductAndWriteToHtml(){
        
        const http = new httpClient(fetchUser);
        http.getProduct((err,result)=>{
            if(err){
                alert(result ,"Hiba van!!");
            }
            else{
                console.table(result);
                result.data.forEach(element => {
                    document.getElementById("productData").innerHTML += `
                    <tr>
            <th scope="row">${element._id}</th>
            <td>${element.name}</td>
            <td>${element.price}</td>
            <td>${element.uploadTime}</td>
          </tr>`
                });
                
            }
        })

    }


}
const product = new Product();

product.getProductAndWriteToHtml();

