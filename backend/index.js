const express= require("express");
const app = express();
app.get("/",(req, resp)=>{
resp.send("app is running");
});

app.listen(6996);