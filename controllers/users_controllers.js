const {userModel,bookModel} = require("../models/index.js");

exports.getAllUsers = async(req,res)=>{
    const users = await userModel.find();

    if(users.length === 0){
        return res.status(404).json({
            success: false,
            message: "No users Found !!"
        })
    }

    return res.status(200).json({
        success: true,
        data: users,
    })

};

exports.getSingleUserById = async(req,res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "No user with the ID found.",
          });
        }
        return res.status(200).json({
          success: true,
          data: user,
        });
    }catch (error) {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
};

exports.addNewUser = async(req,res) => {
    const { data } = req.body;
    if(!data){
        return res.status(400).json({
            success: false,
            message: "No Data to Add a User"
        });
    }
    const newUser = await userModel.create(data);

    return res.status(202).json({
        success: true,
        message: "User added Successfully",
        data: newUser,
    });

};

exports.updateUserById = async(req,res)=>{
    const {Id} =  req.params;
    const {data} = req.body;

    const updatedUser = await userModel.findOneAndUpdate({
        _id: Id,
    }, {
        $set : {...data,}
    }, {
        new: true,
    });
    return res.status(200).json({
        success: true,
        message: "User updated Successfully",
        data: updatedUser,
    });
};

exports.deleteUserById = async(req,res)=>{
    const {id} = req.params;
    const result = await userModel.findOneAndDelete({ _id: id },{new: true,});
    try{
        if(result){
            return res.status(200).json({
                success: true,
                message: "User Data Deletion Success",
            });
        }else{
            return res.status(404).json({
                success: false,
                message: "User Not Found !!",
            });
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
          });
    }
};  

exports.getUserSubscriptionDataById = async(req,res) =>{
    const { id } = req.params;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found !!"
        });
    }
    const getDateInDays = (data = "")=>{
        let date;
        if(data === ""){
            date = new Date();
        }else{
            date = new Date(data);
        }
        let days = Math.floor(date / (1000*60*60*24));
        return days;
    };
    const subscriptionType = (date)=>{
        if (user.subscriptionType === "Basic"){
            date = date +90;
        }else if(user.subscriptionType === "Standard"){
            date = date +180;
        }else if(user.subscriptionType === "Premium"){
            date = date +365;
        }
        return date;
    };

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subExpirationDate = subscriptionType(subscriptionDate);

    const data={...user,
        isSubscriptionExpired : subExpirationDate <= currentDate ,
        daysTillSubscriptionExpiration : subExpirationDate <= currentDate ?
         0:subExpirationDate-currentDate ,
        fine: returnDate < currentDate ? 
         (currentDate-returnDate)*50
         :subExpirationDate <= currentDate ?
          0: 100+ (currentDate-returnDate)*50,
    }

    return res.status(200).json({
        success: true,
        message: "Subscription Details of user : ",
        data : data
    });
};

    