const express = require('express');
const app = express();
const userRouter = require('./routes/users.router');
const taskRouter = require('./routes/tasks.router');
const apiKeyMiddleware = require('./middlewares/api.middleware');
const { launchBot } = require("./bot");
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(apiKeyMiddleware);
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//start server only if called directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log("Server started on port " + PORT);
        try {
            launchBot();
        } catch (err) {
            console.log(err);
        }
    });
}

// Export app for testing
module.exports = app;
