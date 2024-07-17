async function deleteProduct(id) {
   const response = confirm('do you want to delete?');

   if(response){
    const result = await fetch(`/delete-product/${id}`, {method : 'DELETE'});
    if(result.ok){
        location.reload();  // means refreshing
    }
   }
}