const {User,Category,Order,Product,ProductQuantity,UnitOfMeasure} = require("./Schema"); 
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
jwt.Promise = Promise;
// Email küldése a Gmail fiókod segítségével
let transporter = nodemailer.createTransport({
    host: 'smtp.rackhost.hu',
    port: 465,
    secure: true,
    auth: {
        user: 'dominik@dmwebserver.hu',
        pass: 'mrt123mrt'
    }
});


const MethodsForOrder = {
    getAllOrder: (callback) => {
      Order.find({})
        .then(data => {
          callback(false, data);
        })
        .catch(err => {
          callback(true, err);
        });
    },
    getOrderById: (data, callback) => {
      Order.findOne({ _id: data.id })
        .then(order => {
          if (order) {
            callback(false, order);
          } else {
            callback(true, "Rendelés nem található");
          }
        })
        .catch(err => {
          callback(true, err);
        });
    },
    makeOrder: (data, callback) => {
      if (data.code && data.userID && data.productID && data.quantity) {
        const newOrder = new Order({
          code: data.code,
          userID: data.userID,
          productID: data.productID,
          quantity: data.quantity,
        });
        newOrder.save()
          .then((data) => {
            callback(false, data);
          })
          .catch(err => {
            callback(true, err);
          });
      } else {
        callback(true, "Hiányzó adat(ok)!");
      }
    },
    deleteOrder: (data, callback) => {
      Order.deleteOne({ _id: data.deleteID })
        .then(data => {
          callback(false, data);
        })
        .catch(err => {
          callback(true, err);
        });
    },
    updateOrder: (data, callback) => {
      const { id, code, userID, productID, quantity } = data;
      Order.updateOne({ _id: id }, { code, userID, productID, quantity })
        .then(res => {
          if (res.nModified) {
            callback(false, res);
          } else {
            callback(true, "Nincs változás");
          }
        })
        .catch(err => {
          callback(true, err);
        });
    },
}
const MethodsForUser = {
    getAllUser: async () => {
        try {
          const users = await User.find({});
          return users;
        } catch (error) {
          throw error;
        }
      },
    getUser:(data,callback)=>{
        User.findOne(data,(user)=>{
            if (user) {
                callback(null,user);
            }else{
                callback(true)
            }
        })
    },
    signin:(data,callback)=>{
        console.log(data);
const email=data.email;
const pass=crypto.createHash('sha256').update(data.pass).digest('hex');

User.findOne({email:email,pass:pass}).then(data=>{
    userData = {
        nickname:data.nickname,
        email:data.email,
        pass:pass,
        isCreateUser: data.isCreateUser,
        id:data._id
    }
    const token= jwt.sign(userData, "userToken", { expiresIn: '12h' })
    callback(false,token);
}).catch(err=>{
    callback(true,err)
})

    },
    signinForToken:(token,callback)=>{
       jwt.verify(token, 'userToken', (err, data) => {
            if(!err){
                
                
                    callback(false,{nickname:data.nickname,
                        email:data.email,
                        pass:data.pass,
                        isCreateUser: data.isCreateUser,
                        id:data._id} );
                  
                
              }else{
                callback(true,err)
              }
        })
    },
    signup: (data, callback) => {
        const checkUser = {
            email: data.email
        }; 
        const newData = {
            nickname:data.nickname,
            email:data.email,
            pass: crypto.createHash('sha256').update(data.pass).digest('hex')
        }
        User.findOne(checkUser).then((user)=>{
            if (!user) {
                const newUser  = new User(newData);
                newUser.save()
                    .then((res) => {
                        callback(null, res);
                    }).then(()=>{
                        let html = `
        <h1>Hello </h1>
        <div> your data nickName: ${data.nickname} pass: ${data.pass}   </div>
        `
        let mailOptions = {
            from: 'dominik@dmwebserver.hu',
            to: data.email,
            subject: 'SIGN UP',
           html:html
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                callback(true,null)
            } else {

                callback(false,token)
                console.log('Az email sikeresen elküldve: ' + info.response);
            }
        });
                    })
                    .catch((err) => {
                        callback(err, null);
                    });
            } else {
                callback(true, "ezel az adatal már regisztráltak");
            }
        });
    },
    sendCodeToChangePass:(data,callback)=>{

        const rand = Math.floor(Math.random()*8999)+1000;

        const code = { code:rand,newPass:data.newPass,email:data.email };
const secret = 'emailcode';

const token = jwt.sign(code, secret, { expiresIn: '5m' });
        let html = `
        <h1>Hello </h1>
        <div> your code ${code.code} </div>
        `
        let mailOptions = {
            from: 'dominik@dmwebserver.hu',
            to: data.email,
            subject: 'Teszt üzenet',
           html:html
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                callback(true,null)
            } else {

                callback(false,token)
                console.log('Az email sikeresen elküldve: ' + info.response);
            }
        });
    },
    onCodeToChangePass:(data,callback)=>{
        if(data.token){
            jwt.verify(data.token, 'emailcode', (err, decoded) => {
                if (err) {
                  console.error(err);
                } else {
                    console.log(decoded.code);
                  if(decoded.code == data.code){
                    callback(false, {newPass: crypto.createHash('sha256').update( decoded.newPass).digest('hex') ,email:decoded.email});
                  }else{
                    callback(true,"nem azonos probáld újra")
                  }
                }
              });
        }else{
            callback(true,null)
            return;
        }
    }
}
const MethodsForCategory = {
    getAllCategory:(callback)=>{
        Category.find({}).then(data=>{
            callback(false,data)
        }).catch(err=>{
            callback(true,err)
        })
    },  
    makeCategory:(data,callback)=>{
        if (data.value) {
            const newCategory = new Category({
                value:data.value
            })
            newCategory.save().then((data)=>{
                callback(false,data);
            }).catch(err=>{
                callback(true,err)
            })
        }
    },
    deleteCategory:(data,callback)=>{
        Category.deleteOne({_id:data.deleteID}).then(data=>{
            callback(false,data);
        }).catch(err=>{
            callback(true,err);
        })
    }

}
const MethodsForProduct = {
    getAllProduct:(callback)=>{
        Product.find({}).then(data=>{
            callback(false,data)
        }).catch(err=>{
            callback(true,err);
        })
    },
    deleteProductByID:(id,callback)=>{
        Product.deleteOne({_id:id}).then(data=>{
            callback(false,data);
        }).catch(err=>{
            callback(true,err)
        })
    },
    makeProduct:(data,callback)=>{
        const { name, categoryID, price, newCategory } = data;
    
        if (name && categoryID && price) {
            const newProduct = new Product({
                name: name,
                categoryIDs: categoryID,
                price: price
            });
            newProduct.save().then(data=>{
                callback(false,data);
            }).catch(err=>{
                callback(true,err)
            });
        }
        else if (name && price) {
            console.log("van uj");
            if (newCategory != null) {
                MethodsForCategory.makeCategory({value:newCategory},(err,newID)=>{
                    if (!err) {
                        const newProduct = new Product({
                            name: name,
                            categoryIDs: newID._id,
                            price: price
                        });
                        newProduct.save().then(data=>{
                            callback(false,data);
                        }).catch(err=>{
                            callback(true,err)
                        });
                    } else {
                        const newProduct = new Product({
                            name: name,
                            price: price
                        });
                        newProduct.save().then(data=>{
                            callback(false,data);
                        }).catch(err=>{
                            callback(true,err)
                        });
                    }
                });
            } else {
                const newProduct = new Product({
                    name: name,
                    price: price
                });
                newProduct.save().then(data=>{
                    callback(false,data);
                }).catch(err=>{
                    callback(true,err)
                });
            }
        } else {
            callback(true,"Nincs elég adat a Product Felvételéhez")
        }
    }
    

}



module.exports = {
    MethodsForUser:MethodsForUser,
    MethodsForProduct:MethodsForProduct,
    MethodsForCategory:MethodsForCategory,
    MethodsForOrder:MethodsForOrder,
}