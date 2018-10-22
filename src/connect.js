const mongoose = require("mongoose");
try {
    mongoose.connect("mongodb://localhost:auth/auth", { useNewUrlParser: true } );

}catch(e){
    console.log(e);
}

