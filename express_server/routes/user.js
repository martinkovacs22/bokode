const express = require("express");
const router = express.Router();
const {MethodsForUser} = require("../database/routing");
const { User } = require("../database/Schema");
router.route("/signup").post((req,res)=>{
    const data ={nickname: req.body.nickname,
        email:  req.body.email,
        pass:  req.body.pass}
        console.log(data);
     MethodsForUser.signup(data,(error,data)=>{
        if (error) {
            console.log(error);
            res.json({err:true,data:data})
            return;
        }
        //console.log(data,"ez a new user ertékei");
        res.json({err:false,data:data})
    });
})
router.route("/getAll").get(async (req, res) => {
    try {
      const data = await MethodsForUser.getAllUser();
      res.json({ err: false, data: data });
    } catch (error) {
      console.log(error);
      res.json({ err: true, data: error });
    }
  });
router.route("/signin").post((req,res)=>{
    const data ={
        email:  req.body.email,
        pass:  req.body.pass
    }
        
     MethodsForUser.signin(data,(error,data)=>{
        if (error) {
            console.log(error);
            res.json({err:true,data:error});
            return;
        }
        res.json({err:false,data:data});
        return;
     })
})
router.route("/signin/:token").post((req,res)=>{

     MethodsForUser.signinForToken(req.params.token,(error,data)=>{
        if (error) {
            console.log(error);
            res.json({err:true,data:error});
            return;
        }
        res.json({err:false,data:data});
        return;
     })
})
router.route("/changePass").post((req,res)=>{
    const data = {email:req.body.email,newPass:req.body.newPass}
    MethodsForUser.sendCodeToChangePass(data,(err,data)=>{
        if (!err) {  
            console.log(data);
            res.json({err:false,data:data})
            return;
        }else{
            console.log("hiba");
            res.json({err:true,data:null})
            return;
        }
    });
    

})
router.route("/changePass/:token").post((req,res)=>{
    const data = {token:req.params.token,code:req.body.code}
    MethodsForUser.onCodeToChangePass(data,(err,data)=>{
        if (err) {
            console.log(data);
            res.json({err:true,data:data})
            return;
        }else{
            console.log(data);
            User.updateOne({email: data.email }, { pass: data.newPass }).then((err,result)=> {
                if(err){
                    res.json({err:false,user:result,error:err}) 
                    return;
                }else{
                    res.json({err:true,data:"nincs ilyne email "}) 
                    return
                }
              });
            
            return;
        }
    })
    

})
router.route("/:id").post((req,res)=>{
    MethodsForUser.getUser(req.body,(error,data)=>{
        if (error) {
            res.json({err:true,data:error})
        }
        UserData = {
            nickname:data.nickname,
            email:data.email,
            isCreateUser:data.isCreateUser
        }
        res.json({err:false,data:UserData})
    })
})

module.exports = router;