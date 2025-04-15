const express  = require("express")

const app = express()

app.get("/", function(req,res){
    res.send("hi");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// map function
// function f(a){
//     return a*2;
// }
// arr = [1,2,3]

// const ans = arr.map( (a) => {
//     return a * 3;
// })
// console.log(ans)

// filter method 

// const arr = [1,2,3,4]
// const ans = arr.filter((n) =>{
//     if (n%2 == 0 ){
//         return true;
//     }else{
//         return false;
//     }
// })
// console.log(ans)

// arr = [1,2,3,4,5]

// arr.filter( (a) => { return a>2 })
// (3) [3, 4, 5]
// arr.map( (a) => { return a*2 })
// (5) [2, 4, 6, 8, 10]

// const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://bhartiyaproudly:PXLVDcMCCmr1E95V@cluster0.a1f0w.mongodb.net/")

