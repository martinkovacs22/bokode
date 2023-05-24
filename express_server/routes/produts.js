const express = require("express");
const router = express.Router();
const { MethodsForProduct } = require("../database/routing");
router.route("/").get((req,res)=>{
    MethodsForProduct.getAllProduct((err,data)=>{
        if (err) {
            res.json({err:true,data:err})
            return
        }
        res.json({err:false,data:data});
    })
}).post((req,res)=>{
    console.log(req.body);
   MethodsForProduct.makeProduct(req.body,(err,data)=>{
    res.json({err:err,data:data})
   })
})
router.route("/:id").post((req,res)=>{
  MethodsForProduct.deleteProductByID(req.params.id,(err,data)=>{
    if (err) {
        res.json({err:true,data:err})
        return
    }
    res.json({err:false,data:data});
    
  })
}).post((req,res)=>{

})

module.exports = router;