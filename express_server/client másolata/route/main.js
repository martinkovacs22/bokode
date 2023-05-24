import {httpGetter} from "./httpGetter/httpGetter.js";
import {Methods} from "./httpGetter/Fetch.js";
import { baseSide } from "./baseOption/chackLogin.js";
function load(){
    const http = new httpGetter(Methods);
    baseSide.base((err,data)=>{
        if (!data.err) {
            
            localStorage.setItem("email",data.data.email)
            localStorage.setItem("nickname",data.data.nickname)
            localStorage.setItem("isCreateUser",data.data.isCreateUser)
            localStorage.setItem("pass",data.data.pass)
            console.log(data);
            window.location = "/main/homepage/home.html"
        }
    });
       
    document.getElementById("form_signup").addEventListener("submit",(e)=>{
        e.preventDefault();
        http.signIn({email:e.target.email.value,pass:e.target.pass.value},
        (err,data)=>{
            if (err) {
                console.log(err);
                //alert(err)
            }
            else{
                localStorage.setItem("email",data.data.email)
                localStorage.setItem("nickname",data.data.nickname)
                localStorage.setItem("isCreateUser",data.data.isCreateUser)
                localStorage.setItem("pass",data.data.pass)
                window.localStorage.setItem("token",data.data)
                console.log(data);
                window.location = "/main/homepage/home.html"
            }
        })
    }); 
    
    
}
window.addEventListener("load",(e)=>{
    e.preventDefault();
    load();
})