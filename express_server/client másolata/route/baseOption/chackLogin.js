import { httpGetter} from "../httpGetter/httpGetter.js";
import {Methods} from "../httpGetter/Fetch.js";

 const baseSide= {
    base:(callback)=>{
    if(localStorage.getItem("token") && (localStorage.getItem("token") !== false ||localStorage.getItem("token") !== "false" || localStorage.getItem("token") !== undefined || localStorage.getItem("token") !== "undefined"  ) ) {

const http = new httpGetter(Methods);

http.isLogin(localStorage.getItem("token"),(err,data)=>{
    callback(err,data)
})

}

    },
    logout:()=>{
        if(localStorage.getItem("token") && (localStorage.getItem("token") !== false ||localStorage.getItem("token") !== "false" || localStorage.getItem("token") !== undefined || localStorage.getItem("token") !== "undefined"  ) ) {

            localStorage.setItem("email",false)
            localStorage.setItem("nickname",false)
            localStorage.setItem("isCreateUser",false)
            localStorage.setItem("pass",false)
            localStorage.setItem("token",false)
           window.location= "/"
           console.log("siker");
    }
}
 }

export {baseSide};