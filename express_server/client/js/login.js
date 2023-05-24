import { fetchUser } from "./config/http/fetchUser.js";
import { httpClient } from "./config/http/httpClient.js";
import { CookieHandler } from "./config/cookie/cookie.js";
import { Location } from "./config/location/location.js";
const LocationControll = new Location();
LocationControll.start();
const state = {
    pass:"",
    email:"",
}
document.getElementById("showPass").addEventListener("change",(e)=>{
    e.preventDefault();
    if (e.target.checked) {
        document.getElementById("pass").setAttribute("type","text")
    }else{
        document.getElementById("pass").setAttribute("type","password")
    }
})

document.getElementById("value").addEventListener("change",(e)=>{
    e.preventDefault();
    state.email = e.target.value;
})

document.getElementById("pass").addEventListener("change",(e)=>{
    e.preventDefault();
    state.pass = e.target.value;
})

document.getElementById("login").addEventListener("submit",(e)=>{
    e.preventDefault();

    
        const http = new httpClient(fetchUser);
        http.login(state,(err,result)=>{
            if (err) {
                alert("Nem Sikerült!!")
            }else{
                const cookieHandler = new CookieHandler();
                if (cookieHandler.get("token") != null) {
                    cookieHandler.set("token",result.data)
                    window.location="/client/html/main.html"
                    LocationControll.start();
                }else{
                    cookieHandler.add("token",result.data);
                    window.location = "/client/html/main.html"
                    LocationControll.start();
                }
                
                
            }
        }); 
 
     
    console.log(state)
})