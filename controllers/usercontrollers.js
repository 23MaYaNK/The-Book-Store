const Book = require('../models/Book');
const User = require('../models/User');
const params = require('../routes/book');
const bcrypt = require('bcrypt');
const saltRound = 10;
const cloudniary =require("cloudinary").v2;
async function addNewbook(req,res) {
    try{
        cloudniary.config({
            cloud_name:"dp2spm9iw",
            api_key: "489784654753471",
            api_secret: "wEQaS0SL7WIZReEpW2PCLT9McD8"
        });
        const result =await cloudniary.uploader.upload(req.file.path);
        console.log(req.body)
        console.log("..........................")
        let book=new Book(req.body);
        book.bookImage=result.secure_url;
        await book.save();
        res.render('bookadded.ejs');

    }catch(err){
        console.log(err);
    }
    
}





async function addUser(req, res) {
    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRound);
        let user = new User(req.body);
        console.log(user);
        user.password = hashedPassword;
        // console.log(req.body);
        await user.save();
        res.render('useradded.ejs');

    } catch (err) {
        console.log(err);
    }
}
async function dologin(req, res) {
    try {
        console.log(req.body, 'req.body');  // Log input data

        // Find user by emailId
        let user = await User.findOne({ emailId: req.body.emailId });
        if (!user) {
            console.log('No user found with this email');
            return res.status(404).end("No user found");
        }

        console.log(user, 'user found for login');

        // Compare passwords
        const isMatch = await bcrypt.compare(req.body.password, user.password);
       const Name =user.firstName;
       const Email=user.emailId;
        if (isMatch) {
            if (user.usertype == 1) {
                console.log('Admin login successful');
                return res.render('admin.ejs');
            } else {
                console.log(Name," hello how's uh ..? you login succesfully", )
                // console.log('User login successful');
                return res.render('user.ejs');
            }
        } else {
            console.log('Wrong password entered');
            return res.status(401).end("Wrong password");
        }

    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).send("An error occurred during login");
    }
}
async function showbooks(req, res) {
    try {
        let book = await Book.find({});
        
        res.render('showbooks.ejs', {
            book: book      // user--> table fetching data : user--> our varible on line 49
        })

    } catch (err) {
        console.log(err);
    }

}
async function showbooksuser(req, res) {
    try {
        let book = await Book.find({});
        
        res.render('showbooksuser.ejs', {
            book: book      // user--> table fetching data : user--> our varible on line 49
        })

    } catch (err) {
        console.log(err);
    }

}

async function showusers(req, res) {
    try {
        let user = await User.find({});
        
        res.render('showusers.ejs', {
            user: user      // user--> table fetching data : user--> our varible on line 49
        })

    } catch (err) {
        console.log(err);
    }

}

async function getUserForEdit(req, res) {
    try {

        let id = req.params.id;
        let user = await User.findOne({ _id: id });
        console.log(user);
        res.render('userforedit', {
            user: user

        });

    } catch (err) {
        console.log(err, 'err');
    }
}
async function getBookForEdit(req, res) {
    try {

        let id = req.params.id;
        let book = await Book.findOne({ _id: id });
        console.log(book);
        res.render('bookforedit', {
            book: book

        });

    } catch (err) {
        console.log(err, 'err');
    }
}

async function updateUser(req, res) {
    try {
        let id = req.params.id;
        console.log(req.body, "request body")
        let user = await User.findOne({ _id: id });
        console.log(user);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.country = req.body.country;
        user.emailId = req.body.emailId;
        user.mobileNo = req.body.mobileNo;
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRound);
        user.password = hashedPassword;
        await user.save();
        let users = await User.find({});
        res.render('showusers', {
            user: users  // fileReference : yourvarilable Reference
        })
    } catch (err) {
        console.log(err);
    }
}
async function updateBook(req, res) {
    try {
        let id = req.params.id;
        console.log(req.body, "request body")
        let book = await Book.findOne({ _id: id });
        console.log(book);
        book.bookTitle = req.body.bookTitle;
        book.authorName = req.body.authorName;
        book.publisherName = req.body.publisherName;
        book.language = req.body.language;
        book.pricePerUnit = req.body.pricePerUnit;
        book.noofPages = req.body.noofPages;
        book.isbnNo = req.body.isbnNo;
        book.originCountry = req.body.originCountry;

        await book.save();
        let books = await Book.find({});
        res.render('showbooks.ejs', {
            book: books  // fileReference : yourvarilable Reference
        })
    } catch (err) {
        console.log(err);
    }
}
async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        await User.deleteOne({ _id: id });
        let user = await User.find({});
        res.render('showusers.ejs', {
            user: user
        })


    } catch (err) {
        console.log(err);
    }

}
async function deleteBook(req, res) {
    try {
        let id = req.params.id;
        await Book.deleteOne({ _id: id });
        let book = await Book.find({});
        res.render('showbooks.ejs', {
            book: book
        })


    } catch (err) {
        console.log(err);
    }

}


module.exports = {
    addUser,
    dologin,
    showusers,
    getUserForEdit,
    deleteUser,
    updateUser,
    addNewbook,
    getBookForEdit,
    deleteBook,
    updateBook,
    showbooks,
    showbooksuser

}