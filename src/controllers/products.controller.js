import path from 'path';
import ProductModel from '../models/product.model.js';
import { url } from 'inspector';

export default class ProductsController{
    getProducts(req,res){
        const products = ProductModel.getProducts();
        // console.log('ProductModel', booksArr);
        // console.log(path.resolve());
        return res.render('products',{products});

        //return res.sendFile(path.join(path.resolve('src', 'views', 'products.html')));
    }
    
    //showing form to add product
    getAddProductForm(req, res){
        return res.render('addProduct', { errorMessage: null });
    }

    //creating new product
    postAddProduct(req,res){
        console.log(req.body);

        
        //updating products array
        ProductModel.postAddProduct(req.body);
        const products = ProductModel.getProducts();
        return res.render("products",{products});
    }
    
   // create new product
    getUpdateProductForm(req,res){
        console.log(req.params);
        //1. if product exists show the update-form
        const id = req.params.id;
        const product = ProductModel.findById(id);

        if(product){
            return res.render('update-product', {product, errorMessage : null});
        }
        
        return res.status(404).send( "product not found!!!!!!!!!!");
    }

    //updating the product
    updateProduct(req, res){
        //update prodcut
        ProductModel.update(req.body);
        //get all products
        const products = ProductModel.getProducts();
        //show all products on products view
        return res.render('products', {products, errorMessage : null});
    }

    //deleting the product
    deleteProduct(req, res){
        //check if product exists in product array
        const id = req.params.id;
        const product = ProductModel.findById(id);
        //if product not found
        if (!product) {
            return res.status(404).send('product not found!!!');
        }
        //delete product if it exists
        ProductModel.delete(id);
        const products = ProductModel.getProducts();
        return res.render('products', {products, errorMessage : null});
        
    }
    
}




