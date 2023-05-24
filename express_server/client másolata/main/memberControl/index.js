import { httpGetter } from "../../route/httpGetter/httpGetter.js";
import { Methods } from "../../route/httpGetter/Fetch.js";
import { baseSide } from "../../route/baseOption/chackLogin.js";
function load() {
    const http = new httpGetter(Methods);
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
http.getAllUser((err,data)=>{
    console.log(err);
    if (err) {
        
            document.getElementById("member").innerHTML += `<tr> Nincs Adat
          </tr>`
            
       
    }else{
        data.then(res=>{
        res.data.map(item=>{
            document.getElementById("member").innerHTML += `<tr>
            <th scope="row">${item._id}</th>
            <td>${item.nickname}</td>
            <td>${item.email}</td>
            <td>@${item.isCreateUser}</td>
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