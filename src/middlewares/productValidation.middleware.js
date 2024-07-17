import {body, validationResult} from 'express-validator';

// const validateProduct = (req, res, next)=>{
//     //validation
//     const {name, desc, price, imageUrl} = req.body;
        
//     const errors = [];
    
//     if(!name || name.trim() == ''){
//         errors.push('Name is invalid');
//     }

//     if(!desc || desc.trim() == ''){
//         errors.push('Invalid description');
//     }

//     if(!price || price < 1){
//         errors.push('Price is invalid');
//     }
//     try {
//         new URL(imageUrl);
//     } catch (error) {
//         errors.push('Invalid image URL');
//     }

//     console.log(errors);

//     if(errors.length > 0){
//         return res.render('addProduct', {errorMessage : errors[0]});
//     }
//     next();

// }


const validateProduct = async (req, res, next)=>{
    //validation
    
    //step-1 : set-up rules
    const rules =[
        body('name').isLength({min:3}).withMessage('name is required'),
        body('desc').isLength({min : 3}).withMessage('description is required'),
        body('price').isFloat({min:1}).withMessage('price is required'),
        body('imageUrl').isURL().withMessage('image url is required'),
        
    ];

    //step-2 : run these rules
    await Promise.all(rules.map(rule => rule.run(req)));
    const valdationErrors = validationResult(req);
    console.log('step-2',valdationErrors)

    //step-3 : check for validation
    if(!valdationErrors.isEmpty()){
        console.log('step-3',valdationErrors.array()[0])
        return res.render('addProduct', {errorMessage : valdationErrors.array()[0].msg});
    }


    
    next();

}

export default validateProduct;