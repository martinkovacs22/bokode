import { Modal } from "./config/modal/model.js";

function addMemberOnSubmit() {
    console.log("hello");
}

const modal = new Modal("jofele","hello",addMemberOnSubmit);


document.getElementById("addMemeber").addEventListener("click",(e)=>{
e.preventDefault();

document.getElementById("addMemeberPlace").innerHTML += modal.onVisible();
})