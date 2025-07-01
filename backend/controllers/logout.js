const logout=(req,res)=>{
    res.clearCookie("token");
    res.json("success");    
}

export default logout;