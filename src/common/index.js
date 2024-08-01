

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
}



export default summaryApi;