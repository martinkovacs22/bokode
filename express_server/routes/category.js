const express = require("express");
const router = express.Router();
const {MethodsForCategory} = require("../database/routing");
router.route("/").get((req,res)=>{
    MethodsForCategory.getAllCategory((err,data)=>{
        if (err) {
            res.json({err:true,data:err})
            return
        }
        res.json({err:false,data:data});
        return
    })
}).post((req,res)=>{
    MethodsForCategory.makeCategory({value:req.body.value},(err,data)=>{
        if (err) {
            res.json({err:true,data:err})
        }
        res.json({err:false,data:data})
    })
})
router.route("/:id").post((req,res)=>{
 MethodsForCategory.deleteCategory({deleteID:req.params.id},(err,data)=>{
    if (err) {
        res.json({err:true,data:err});
        return;
    }
    res.json({err:false,data:data});
 })
})

module.exports = router;