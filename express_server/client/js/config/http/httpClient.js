import { CookieHandler } from "../cookie/cookie.js";
export class httpClient{

    constructor(fetchUser){
        this.fetchUser = fetchUser;
    }

    signUp(data,callback){
        const url = "url";//átkell írni 
        this.fetchUser.post(url,data,(err,result)=>{
            if (err) {
                console.log("nem sikerült a fetch eküldése");
                callback(true,null)
            }
            else{
                callback(err,result)
            }
        })
    }
    login(data,callback){
        const url = "http://217.13.111.33:3000/user/signin";//átkell írni 
        this.fetchUser.post(url,data,(err,result)=>{
            if (err) {
                console.log("nem sikerült a fetch eküldése");
                callback(true,null)
            }
            else{
                callback(err,result)
            }
        })
    }
    loginByToken(callback){
        const cookie = new CookieHandler();
        const url = `http://217.13.111.33:3000/user/signin/${cookie.get("token")}`;//átkell írni 
        this.fetchUser.postWitOutData(url,(err,result)=>{
            console.log("fut");
            if (err) {
                console.log("nem sikerült a fetch eküldése");
                callback(true,null)
            }
            else{
                callback(err,result)
            }
        })
    }
    getProduct(callback){
        const url = "http://217.13.111.33:3000/product";
        this.fetchUser.get(url,(err,result)=>{
            console.log("fut");
            if (err) {
                console.log("nem sikerült a fetch eküldése");
                callback(true,null)
            }
            else{
                callback(err,result)
            }
        })
    }

}
