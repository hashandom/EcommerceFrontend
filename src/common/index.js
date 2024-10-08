

const backEndDomain = "http://localhost:3000";

const summaryApi = {
    signUp:{
        url: `${backEndDomain}/api/signup`,
        method:"post"
    },
    login:{
        url: `${backEndDomain}/api/login`,
        method:"post"
    },
    current_user:{
        url: `${backEndDomain}/api/user-details`,
        method:"get"
    },
    logout_user:{
        url : `${backEndDomain}/api/userLogout`,
        method:"get"
    },
    allUser : {
        url : `${backEndDomain}/api/all-user`,
        method:"get"
    },
    updateUser:{
        url : `${backEndDomain}/api/update-user`,
        method:"post"
    },
    uploadProduct:{
        url : `${backEndDomain}/api/upload-product`,
        method:"post"
    },
    allProduct:{
        url : `${backEndDomain}/api/get-product`,
        method:"get"
    },
    updateProduct:{
        url : `${backEndDomain}/api/update-product`,
        method:"post"
    },
    categoryProduct:{
        url : `${backEndDomain}/api/get-category-product`,
        method:"get"
    },
    categoryWiseProduct:{
        url : `${backEndDomain}/api/category-product`,  
        method:"post"
    },
    productDetails:{
        url : `${backEndDomain}/api/product-details`,  
        method:"post"
    },
    addToCartProduct:{
        url : `${backEndDomain}/api/addtocart`,  
        method:"post"
    },
    addToCartProductCount:{
        url : `${backEndDomain}/api/countAddToCartProduct`,  
        method:"get"
    },
    addToCartProductView:{
        url : `${backEndDomain}/api/view-cart-product`,  
        method:"get"
    },
    updateCartProduct:{
        url : `${backEndDomain}/api/update-cart-product`,  
        method:"post"
    },
    deleteCartProduct:{
        url : `${backEndDomain}/api/delete-cart-product`,  
        method:"post"
    },
    searchProduct:{
        url : `${backEndDomain}/api/search`,  
        method:"get"
    },
    filterProduct:{
        url : `${backEndDomain}/api/filter-product`,  
        method:"post"
    }
  
}



export default summaryApi;