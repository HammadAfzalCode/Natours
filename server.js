const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config({
    path: "./config.env"
})
const app = require("./app");
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {

    console.log("DB connection successful")
})


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App is listening of port: ${port}`);
});