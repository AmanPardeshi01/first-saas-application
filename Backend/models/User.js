import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    trailActive:{
        type: Boolean,
        default: true,
    },
    trailPeriod:{
        type: Number,
        default: 7,
    },
    trialExpires:{
        type: Date,
        // default: Date.now,
    },
    subscription:{
        type: String,
        enum : ['Trail','Free','Basic', 'Premium'],
    },
    apiRequestCount:{
        type: Number,
        default: 0,
    },
    monthlyApiRequestCount:{
        type: Number,
        default: 0,
    },
    nextBillingDate:{
        type: Date,
        payments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Payment'
            }
        ]
    },
    history:{
        payments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'History'
            }
        ]
    },
},
{
    timestamps: true
}
);


const User = mongoose.model('User', userSchema);

export default User;