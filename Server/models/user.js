import mongoose  from "mongoose";
import familySchema from "./family";


const userSchema=new mongoose.Schema(
    {
        name: {type: String, required:true},
        email:{type: String, required:true},
        password:{type: String ,required:true},
        phone:{type:String,unique:true,sparse:true},
        isphoneVerified:{ type: Boolean , default:false},
        location:{
           latitude:{type:Number},
           longitude:{type:Number} 
        },
        role: {
            type: String,
            enum: ["member", "doctor", "salonOwner", "hospital", "ambulance", "admin"],
            default: "member"
          },
        familyMembers:[familySchema],
       
        nearbyServices:{
            ambulances:[
                {
                    name:{type:String},
                    contact:{type:String}
                }
            ],
            hospitals:[
                {
                    name:{type:String},
                    address:{type:String}
                }
            ],
            labs:[
                {
                    name:{type:String},
                    address:{type:String}
                }
            ]
        }
    },
    {timestamps:true}
);

export default mongoose.model("User",userSchema);