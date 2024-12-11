import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";



const registerUser = asyncHandler(
   
    async (req, res, next) => {

        //get user Details from frontend
        const { password, fullName, email} = req.body


        //field validation
        if ([password, fullName, email].some((field) => field.trim() === "")) {
           throw new ApiError(400, "Invalid Api Field")
        }


        //allready exists check
        const existedUser = await User.findOne({ 
            $or:[ { email} ]
        });

        if (existedUser) {
           throw new ApiError(409, "User Already Exists")
        }




        //create user object
        const user = await User.create({
            fullName,
            email,
           password
        })
        
        
        //remove password, refresh token from response

        const createdUser = await User.findById(user._id).select("-password")
        //check for user creation
        if(!createdUser){
            throw new ApiError(500, "Some thing went wrong while creating a new user")
        }


        //send back to response
        res.status(201).json(
            new ApiResponse(
             createdUser,
             "User created successfully"
            
            )
        )
    }
)


const loginUser=asyncHandler(async(req,res,next)=>{
    //getting user data from req.body
    //username or email check
    //user exists check
    //password correct check
    //create refresh token
    //create access token
    //send via cookie
    //refresh token send to db
    //send back to response
    const {email,password}=req.body;
    if([email,password].some((field)=>field.trim()==="")){
        throw new ApiError(400,"Invalid Api Field")
    }


    const user=await User.findOne({
        $or:[
            {email:email?.trim().toLowerCase()}
        ]
    })

    if(!user){
        throw new ApiError(404,"User Not Found")
    }



    const isPasswordCorrect=await user.isPasswordCorrect(password.toString())
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid Password")
    }


   
    const accessToken=user.generateAccessToken();

 

    const options={
        httpOnly:true,
        secure:true
    }


   
    res.status(200).
    cookie("accessToken",accessToken,options).
    json(
        new ApiResponse(
            {user,accessToken},
            "User Logged In Successfully"
        )   
    )


})

const logoutUser=asyncHandler(async(req, res)=>{
//    //unset refresh token from db
//    await User.findByIdAndUpdate(
//     req.user._id,
//     {
//         $unset:{refreshToken:1}
//     },
//     {
//         new:true
//     }
//     )



    const options={
        httpOnly:true,
        secure:true
    }

    //clear the refresh token and access token
    res.
    status(200)
    .clearCookie("accessToken",options)
    .json(
        new ApiResponse(
            {},
            "User Logged Out Successfully"
        )
    )
})

// const updateAccessToken = asyncHandler(async(req,res)=>{
//     //getting refreshToken from frontend
//     const {refreshToken} =req.cookies || req.body
//     //frontend data validation
//     if(!refreshToken){
//         throw new ApiError(400,"Invalid credentials")
//     }
//     //verify token
//     const decodedToken= jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);


//     //check if token is valid and getting user
//     const user=await User.findById(decodedToken?._id);
//     if(!user) throw new ApiError(401,"Invalid refresh token");

//     //refresh token valodation
//     if(user?.refreshToken!=refreshToken) throw new ApiError(401,"Invalid refresh token")

//     //making new access token and refresh token
//     const newRefreshToken=user.generateRefreshToken();
//     const accessToken=user.generateAccessToken();


//     //save new refresh token to db
//     user.refreshToken=newRefreshToken;
//     await user.save({validateBeforeSave:false});


//     //send it via cookie
//     //send response to frontend
//     const options={
//         httpOnly:true,
//         secure:true
//     }
//     res.
//     status(200).
//     cookie("accessToken",accessToken,options).
//     cookie("refreshToken",newRefreshToken,options).
//     json(new ApiResponse({refreshToken:newRefreshToken,accessToken},"Tokens are updated successfully"))
// })


// const updatePassword=asyncHandler(async(req,res) => {
//     //getting user data from req.body
//     const {oldPassword,newPassword}=req.body
//     // data validation
//     if(!oldPassword ||!newPassword){
//         throw new ApiError(400,"Invalid Api Field")
//     }
//     //getting user from db
//     const user=await User.findById(req.user._id)
//     if(!user){
//         throw new ApiError(404,"User Not Found")
//     }
//     //password correct check
//     const isPasswordCorrect=await user.isPasswordCorrect(oldPassword.toString())
//     if(!isPasswordCorrect){
//         throw new ApiError(401,"Invalid Password")
//     }
//     //updating password
//     user.password= newPassword
//    await user.save({validateBeforeSave:false});

//    res.status(200).json(new ApiResponse({},"password updated successfully"))
    
// })
export { registerUser , loginUser, logoutUser}