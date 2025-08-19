import mongoose  from "mongoose";

const familySchema =new mongoose.Schema({
    name: {type: String , required : true},
    age: {type: Number,required: true},
    gender: {type: String, enum:["Male","Female","other","MySelf"]},
    relation: {type: String},
    medicalrecords:[
        {
            prescription:{type: String},
            labReports:[
                {
                    reportName:{type: String},
                    fileType:{type: String, enum:["Image","pdf"]},
                    filePath:{type:String, required: true},
                    uploadedAt:{type: Date, default:Date.now}
                }
            ],
            appointments:[
                {
                    departments:{type: String},
                    doctor:{ type : String},
                    date: {type: Date},
                    time: {type: String},
                    type: {type: String, enum:["Emergency","Regular"]},
                    queuePosition: {type :Number},
                    otp:{type: String}
                }
            ]
        }
    ]
})

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