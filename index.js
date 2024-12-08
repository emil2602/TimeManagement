const express = require('express');
const app = express();
const userRouter = require('./routes/users.router');
const apiKeyMiddleware = require('./middlewares/api.middleware');
const {launchBot} = require("./bot");
const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
    try {
        launchBot()
    } catch (err) {
        console.log(err);
    }
});

app.use(express.json());
app.use(apiKeyMiddleware);
app.use('/api/users', userRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
})