import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    reference:{
        type: String,
        required: true,
    },
    currency:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        default: "pending",
        required: true
    },
    subscriptionPlan:{
        type: Date,
        required: true
    },
    amount:{
        type: Number,
       default: 0
    },
    monthlyApiRequestCount:{
        type: Number,
        default: 0,
    },
},
{
    timestamps: true
}
);


const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;