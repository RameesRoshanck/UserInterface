const userdb = require("../model/model")

//user home page Route
exports.userHomeRoute=(req,res)=>{
    if(req.session.userLogginIN){
        res.render('user-home')
    }else{
        res.redirect("/userLogin")
        
    }
}

// user signup page Route
exports.userSignUpRoute=(req,res)=>{
    if(req.session.userLogginIN){
        res.redirect('/')
    }else{
        res.render('user-signup',{"userLoginErr":req.session.userLoginErr})
        req.session.userLoginErr=false
    }
}

// user login page Route
exports.userLoginRoute=(req,res)=>{
    if(req.session.userLogginIN){
        res.redirect('/')
    }else{
        res.render('user-login',{"userLoginErr":req.session.userLoginErr})
        req.session.userLoginErr=false
    }
}

// user logout page Route
exports.userLogoutRoute=(req,res)=>{
    req.session.userLogginIN=false
    res.redirect('/userLogin')
}

/* -------------------------------------------------------------------------- */
/*                                  user end                                  */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                              start admin side                              */
/* -------------------------------------------------------------------------- */


// admin home page Route
exports.adminHomeRoutes=(req,res)=>{
    if(req.session.adminLogeIn){
        userdb.find({}).then((allUsers)=>{
        res.render("admin-home",{allUsers:allUsers})
    })
    }else{
        res.redirect('/adminLogin')
    }
}


exports.adminLoginRoutes=(req,res)=>{
    if(req.session.adminLogeIn){
            res.redirect('/adminHome')     
    }else{
        res.render('admin-login',{logginError:req.session.adminErr})
        req.session.adminErr=false
    }
}


exports.adminLogout=(req,res)=>{
    req.session.adminLogeIn=false
    res.redirect('/adminLogin')
}

exports.adminCreateRoute=(req,res)=>{
    res.render('admin-addUser')
}

exports.adminEditUser=(req,res)=>{
    userdb.find({_id:req.params.id}).then((user)=>{
        res.render("admin-editUser",{allUsers:user})
    }).catch((error)=>{
        console.log(error);
    })
}


exports.adminDeleteUser= async(req,res)=>{
    try{
       const deleteUser=await userdb.findByIdAndDelete(req.params.id);
       res.redirect('/adminHome')
    }catch(error){
      console.log(error);
    }
}
