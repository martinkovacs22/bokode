import { CookieHandler } from "../cookie/cookie.js";
import { fetchUser } from "../http/fetchUser.js";
import { httpClient } from "../http/httpClient.js";
export class Location{

    exit(){
        const cookie = new CookieHandler();
    if (cookie.get("token")) {
        const http = new httpClient(fetchUser);
        http.loginByToken((err,result)=>{
            if (err) {
                window.location = "/html/login.html";
            }
    })
}else{
    window.location = "/html/login.html";
}
    }
    start(){
        const cookie = new CookieHandler();
    if (cookie.get("token") !=null) {
        console.log("fut");
        const http = new httpClient(fetchUser);
        http.loginByToken((err,result)=>{
            if (!err) {
                window.location = "/html/main.html";
            }
    })
}
    }


}