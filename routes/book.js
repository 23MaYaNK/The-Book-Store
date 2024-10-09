const express=require('express');
const multer=require('multer');
const bookcontroller=require('../controllers/usercontrollers');
const router=express.Router();
router.use(express.urlencoded({extended:false}));

const upload=multer({
    storage:multer.diskStorage({}),
})

router.get('/',(req,res)=>{
    res.render('login.ejs');
})
router.get('/user',(req,res)=>{
    res.render('user.ejs');
})
router.get('/login',(req,res)=>{
res.render('login.ejs')
})
router.post('/do/login',(req,res)=>{
bookcontroller.dologin(req,res)
})
router.get('/admin',(req,res)=>{
    res.render('admin.ejs');
})
router.get('/signup',(req,res)=>{
    res.render('signup.ejs');
})
router.post('/add/user',(req,res)=>{
   bookcontroller.addUser(req,res);
})
router.get('/show/books',(req,res)=>{
    bookcontroller.showbooks(req,res);
})
router.get('/show/users',(req,res)=>{
    bookcontroller.showusers(req,res);
})
router.get('/show/books/user',(req,res)=>{
    bookcontroller.showbooksuser(req,res);
})


router.get('/user/edit/page/:id',(req,res)=>{
    bookcontroller.getUserForEdit(req,res);   
    })
    router.post('/update/user/:id',(req,res)=>{
        bookcontroller.updateUser(req,res);
    
    })
    router.get('/delete/user/:id',(req,res)=>{
        bookcontroller.deleteUser(req,res);
    })
    


router.get('/add/book',(req,res)=>{
    res.render('booknew.ejs');
})

router.post('/add/new/book', upload.single('bookImage'),(req,res)=>{
    bookcontroller.addNewbook(req,res);
})

router.get('/book/edit/page/:id',(req,res)=>{
bookcontroller.getBookForEdit(req,res);   
})
router.post('/update/book/:id',(req,res)=>{
    bookcontroller.updateBook(req,res);

})
router.get('/delete/book/:id',(req,res)=>{
    bookcontroller.deleteBook(req,res);
})

router.get('/profile',(req,res)=>{
    res.render('Adminprofile.ejs')
})
router.get('/dashboard',(req,res)=>{
    res.render('dashboard.ejs')
})
module.exports=router;