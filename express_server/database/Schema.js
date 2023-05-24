const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
  isCreateUser:{type:Boolean,required:false,default:true},
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryIDs: [{ type: String,required:false,default:null }],
  uploadTime: { type: Date, required: false,default:Date.now()},
  price: { type: Number, required: true },

});

const categorySchema = new mongoose.Schema({
  value: { type: String, required: true },
});


const productQuantitySchema = new mongoose.Schema({
  ProductID: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitOfMeasureID: { type: String , required: true },
});

const unitOfMeasureSchema = new mongoose.Schema({
  value:{type:String,required:true}
})

const orderSchema = new mongoose.Schema({
  code: { type: String, required: true },
  userID: { type: String, required: true },
  ProductID: { type: String,  required: true },
  quantity: { type: Number, required: true },
});



const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);
const UnitOfMeasure = mongoose.model('UnitOfMeasure', unitOfMeasureSchema);
const ProductQuantity = mongoose.model('ProductQuantity', productQuantitySchema);
const Order = mongoose.model('Order', orderSchema);

const watchUser = User.watch();
const watchCategory = Category.watch();
const watchProduct = Product.watch();




watchUser.on("change",(oldUser)=>{
    if (oldUser.operationType === 'delete') {
        Order.deleteMany({userID:oldUser.documentKey._id}).then(data=>{
          console.log("Sikeresen törölve lett",data);
        }).catch(err=>{
          console.log("ez a hiba eset amikor User delete volt:",err);
        })
        
      }
})
watchCategory.on("change",(oldCategory)=>{
    if (oldCategory.operationType === 'delete') {
        Product.deleteMany({categoryIDs: oldCategory.documentKey._id}).then(data=>{
          console.log("sikeresen törölve lett az összes olyan adat ami ahsználta ezt a Kategoriát",data);
        }).catch(err=>{
          console.log("hiba történt a Kategoria törlése során:",err);
        })
        
      }
})
watchProduct.on("change",(oldProduct)=>{
    if (oldProduct.operationType === 'delete') {
      ProductQuantity.deleteMany({ProductID:oldProduct.documentKey._id}).then(data=>{
        console.log("sikeres törlés");
      }).catch(err=>{
        console.log("nem sikerült",err);
      })
        
      }
})


module.exports = {
  User: User,
  Product: Product,
  Category:Category,
  UnitOfMeasure:UnitOfMeasure,
  ProductQuantity:ProductQuantity,
  Order:Order,
};
