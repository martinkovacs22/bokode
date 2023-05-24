import { httpGetter } from "../../route/httpGetter/httpGetter.js";
import {Methods} from "../../route/httpGetter/Fetch.js";
import { baseSide } from "../../route/baseOption/chackLogin.js";
function load() {
    baseSide.base((err,data)=>{
        if (data.err) {
            window.location="/";
        }else{
            localStorage.setItem("email",data.data.email)
            localStorage.setItem("nickname",data.data.nickname)
            localStorage.setItem("isCreateUser",data.data.isCreateUser)
            localStorage.setItem("pass",data.data.pass)
            console.log(data);
            document.getElementById("logout").addEventListener("click",(e)=>{
                e.preventDefault();
                baseSide.logout();
            })
        }
    });
   const http = new httpGetter(Methods);
   http.getAllProducts((err,data)=>{
    if (err) {
        console.log("nincs Data");
        document.getElementById("product").innerHTML = "Nincs Adat";
    }
    else{
        data.then(res=>{
            
            res.data.map(item=>{
                document.getElementById("product").innerHTML += `<tr>
                <th scope="row">${item._id}</th>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>@${item.uploadTime}</td>
              </tr>`
                console.log(item);
            })
        })
    }
   })
    
}


window.addEventListener("load",(e)=>{
    e.preventDefault();
    load();
})