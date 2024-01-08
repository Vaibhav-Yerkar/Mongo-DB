
const {userModel,bookModel} = require("../models/index.js");
const issuedBook = require('../dtos/book-dto.js');

exports.getAllBooks = async(req,res) => {
    const books = await bookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success: false,
            message: "No book Found !!"
        })
    }

    return res.status(200).json({
        success: true,
        data: books,
    })

};

exports.getSingleBookById = async(req,res) => {
    const { id } = req.params;
    try {
        const book = await bookModel.findById(id);
        if (!book) {
          return res.status(404).json({
            success: false,
            message: "No book with the ID found.",
          });
        }
        return res.status(200).json({
          success: true,
          data: book,
        });
    }catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
};

exports.getAllIssuedBooks = async (req, res) => {
    const users = await userModel.find({
        issuedBook: { $exists: true },
    }).populate("issuedBook");

    const issuedBooks = users.map((each) => new issuedBook(each));

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Book Have Been Issued Yet..",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Users With The Issued Books...",
        data: issuedBooks,
    });
};

exports.addNewBook = async(req,res) => {
    const {data} = req.body;
    if(!data){
        return res.status(400).json({
            success: false,
            message: "No Data to Add a Book"
        });
    }
    await bookModel.create(data);
    const allBooks = await bookModel.find();

    return res.status(202).json({
        success: true,
        message: "Book added Successfully",
        data: allBooks,
    });

};

exports.deleteBookById = async(req,res)=>{
    const {id} = req.params;
    const result = await bookModel.findOneAndDelete({ _id: id },{new: true,});
    try{
        if(result){
            return res.status(200).json({
                success: true,
                message: "Book Data Deletion Success",
            });
        }else{
            return res.status(404).json({
                success: false,
                message: "Book Not Found !!",
            });
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
    }
};  

exports.updateBookById = async(req,res)=>{
    const {Id} =  req.params;
    const {data} = req.body;

    const updatedBook = await bookModel.findOneAndUpdate({
        _id: Id,
    }, data, {
        new: true,
    });
    return res.status(200).json({
        success: true,
        message: "Book updated Successfully",
        data: updatedBook,
    });
};