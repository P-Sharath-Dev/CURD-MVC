import express from 'express';
import path from 'path';
import ProductsController from './src/controllers/products.controller.js';
import ejs from 'ejs';
import expressEjsLayouts from 'express-ejs-layouts';
import expressLayouts from 'express-ejs-layouts'
import validateProduct from './src/middlewares/productValidation.middleware.js';

const app = express();
const port = 3000;

//configuring ejs as view engine
app.set('view engine', 'ejs');

// defing views directory
app.set('views', path.join(path.resolve('src', 'views')));

//using express ejs layouts
app.use(expressLayouts);

//parsing the form data
app.use(express.urlencoded({extended : true}));

//public path for js and css
app.use(express.static(path.resolve("src", "public")));

app.use(express.static('src/views'));
/* or use
app.use(express.static('src/views')); */


//creating instance
const productsController = new ProductsController();

//to get list of products
app.get('/', productsController.getProducts);

//get form 
app.get('/new', productsController.getAddProductForm)

//submit form
app.post('/',validateProduct, productsController.postAddProduct);

//get update the product form
app.get('/update-product/:id', productsController.getUpdateProductForm);

//updating product
app.post('/update-product', productsController.updateProduct);

//delete product
app.delete('/delete-product/:id', productsController.deleteProduct);

app.listen(port, ()=>{
    console.log('server is running on port', port);
});