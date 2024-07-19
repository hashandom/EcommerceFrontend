

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
    }
    
}



export default summaryApi;