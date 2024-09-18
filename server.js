const dotenv = require("dotenv")
dotenv.config({
    path: "./config.env"
})
const app = require("./app");
console.log(process.env.NODE_ENV)


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App is listening of port: ${port}`);
});