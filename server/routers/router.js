const express=require('express')
const route=express.Router()
const service=require('../sevices/render')
const controller=require('../controller/controller')


/**
 * @discrption Root route user side
 * @method get/
 */
// user home side route
route.get('/',service.userHomeRoute)

// user signup side route
route.get('/UserSign',service.userSignUpRoute)

// user login side route
route.get('/userLogin',service.userLoginRoute)

// user logout side route
route.get('/userLogout',service.userLogoutRoute)

/* -------------------------------------------------------------------------- */
/*                                user side end                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                              admin side start                              */
/* -------------------------------------------------------------------------- */

// admin home page route
route.get('/adminHome',service.adminHomeRoutes)

// admin login page route
route.get('/adminLogin',service.adminLoginRoutes)

// admin logout page route
route.get('/adminLogout',service.adminLogout) 

// admin create user router
route.get('/adminCreateRouter',service.adminCreateRoute)

// admin delete to user router
route.get('/adminDelete/:id',service.adminDeleteUser)

route.get('/adminEditUser/:id',service.adminEditUser)


/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */
route.post('/api/userSignUp',controller.create)
route.post('/api/userLogin',controller.find)
route.post('/api/adminLogin',controller.adminLogin)
route.post('/api/adminCreate',controller.adminAddUser)
route.put('/adminEditUser/:id',controller.updateUser)


module.exports=route