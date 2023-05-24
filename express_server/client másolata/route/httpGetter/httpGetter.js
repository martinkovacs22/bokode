
class httpGetter{

    constructor(Methods){
        this.Methods = Methods;
    }
signIn(userData,callback){

    const data ={
        data:{
        email:userData.email,
        pass:userData.pass},
        url:"http://217.13.111.33:3000/user/signin/"
    }

this.Methods.simplePost(data,(err,data)=>{
if (err) {
    console.log(err);
    callback(true,err)
    return;
}else{
    callback(false,data)
    return;
}
})
}
isLogin(token,callback){

    const newURL = "http://217.13.111.33:3000/user/signin/"+token;
    const data ={
        url:newURL
    }
    this.Methods.simplePostWithOutData(data,(err,data)=>{
        if (err) {
            callback(true,data);
        }else{
            callback(false,data)
        }
    })

}
getAllUser (callback){
    const data ={url: "http://217.13.111.33:3000/user/getAll"}
    this.Methods.simpleGet(data,(err,data)=>{
        if (err) {
            callback(err,data)
            return;
        }else{
             callback(err,data);
        return;
        }
    })
}
getAllProducts (callback){
    const data ={ url: "http://217.13.111.33:3000/product"}
    this.Methods.simpleGet(data,(err,data)=>{
        if (err) {
            callback(err,data)
            return;
        }else{
             callback(err,data);
        return;
        }
       
    })
}


}



export { httpGetter };