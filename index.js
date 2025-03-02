const express = require("express");
const sequelize = require("../config/db");
const User = require("./models/User.model");
const Recipe = require("./models/Recipe.model");
const Rating = require("./models/Rating.model");
const Comment = require("./models/Comment.model");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:3001"
}));
app.use(express.json());

const handleError = (err, res) => {
    console.error(err);
    res.status(500).send({ error: 'Something went wrong!' });
};

app.get("/", async (req, res) => {
    console.log("Root API was accessed");
    await User.findAll({})
        .then((users) => res.json({ users }))
        .catch((err) => res.json({ err }));
});

app.get("/users", async (req, res) => {
    console.log("Users API was accessed");
    await User.findAll({})
        .then((users) => res.json({ users }))
        .catch((err) => res.json({ err }));
});

app.get("/recipes", async (req, res) => {
    console.log("Recipes API was accessed");
    await Recipe.findAll({})
        .then((recipes) => res.json({ recipes }))
        .catch((err) => res.json({ err }));
});

app.get("/comments", async (req, res) => {
    console.log("Comments API was accessed");
    await Comment.findAll({})
        .then((comments) => res.json({ comments }))
        .catch((err) => res.json({ err }));
});

app.get("/users/user", async (req, res) => {
    console.log("User API was accessed");
    const { id } = req.query;
    await User.findOne({ where: { id: Number(id) } })
        .then((user) => {
            if (user) return res.json({ user });
            else return res.json({ message: "User not found" });
        })
        .catch((err) => res.json({ err }));
});

app.get("/recipes/recipe", async (req, res) => {
    console.log("Recipe API was accessed");
    const { id } = req.query;
    await Recipe.findOne({ where: { id: Number(id) } })
        .then((recipe) => {
            if (recipe) return res.json({ recipe });
            else return res.json({ message: "Recipe not found" });
        })
        .catch((err) => res.json({ err }));
});

app.get("/comments/comment", async (req, res) => {
    console.log("Comment API was accessed");
    const { recipeId } = req.query;
    await Comment.findAll({ where: { recipeId: Number(recipeId) } })
        .then((comments) => {
            if (comments) return res.json({ comments });
            else return res.json({ message: "Comments not found" });
        })
        .catch((err) => res.json({ err }));
});

app.get("/users/user/usrcmmts", async (req, res) => {
    console.log("User Comments API was accessed");
    const { userId } = req.query;
    await Comment.findAll({ where: { userId: Number(userId) } })
        .then((comments) => {
            if (comments) return res.json({ comments });
            else return res.json({ message: "Comments not found" });
        })
        .catch((err) => res.json({ err }));
});

app.put("/users/user/usernme", async (req, res) => {
    const { id, username } = req.body;
    await User.update({ username }, { where: { id: Number(id) } })
        .then((result) => {
            if (result[0]) return res.json({ message: "Username updated successfully" });
            else return res.json({ message: "User not found" });
        })
        .catch((err) => res.json({ err }));
});

app.put("/users/user/userpwd", async (req, res) => {
    const { username, password } = req.body;
    await User.update({ password }, { where: { username } })
        .then((result) => {
            if (result[0]) return res.json({ message: "Password updated successfully" });
            else return res.json({ message: "User not found" });
        })
        .catch((err) => res.json({ err }));
});

app.put("/recipes/recipe/recipetle", async (req, res) => {
    const { id, title } = req.body;
    await Recipe.update({ title }, { where: { id: Number(id) } })
        .then((result) => {
            if (result[0]) return res.json({ message: "Title updated successfully" });
            else return res.json({ message: "Recipe not found" });
        })
        .catch((err) => res.json({ err }));
});

app.put("/recipes/recipe/recipecnt", async (req, res) => {
    const { id, content } = req.body;
    await Recipe.update({ content }, { where: { id: Number(id) } })
        .then((result) => {
            if (result[0]) return res.json({ message: "Content updated successfully" });
            else return res.json({ message: "Recipe not found" });
        })
        .catch((err) => res.json({ err }));
});

app.put("/comments/comment/commentup", async (req, res) => {
    const { recipeId, text, userId } = req.body;
    await Comment.update({ text }, { where: { recipeId, userId } })
        .then((result) => {
            if (result[0]) return res.json({ message: "Comment updated successfully" });
            else return res.json({ message: "Comment not found" });
        })
        .catch((err) => res.json({ err }));
});

app.post("/", async (req, res) => {
    const { username, password } = req.body;
    await User.create({ username, password })
        .then((createdUser) => res.json({ message: "Data saved successfully" }))
        .catch((error) => res.json({ error }));
});

app.post("/user", async (req, res) => {
    const { username, password } = req.body;
    await User.create({ username, password })
        .then((createdUser) => res.json({ message: "Data saved successfully" }))
        .catch((error) => res.json({ error }));
});

app.post("/recipe", async (req, res) => {
    const { title, content } = req.body;
    await Recipe.create({ title, content })
        .then((createdRecipe) => res.status(200).json({ message: "Data saved successfully" }))
        .catch((error) => res.status(500).json({ error }));
});

app.post("/comment", async (req, res) => {
    let { text, recipeId, userId } = req.body;
    recipeId = parseInt(recipeId);
    userId = parseInt(userId);
    await Comment.create({ text, recipeId, userId })
        .then((createdComment) => res.status(200).json({ message: "Comment saved successfully" }))
        .catch((error) => res.status(500).json({ error }));
});

sequelize.sync().then(async () => {
    console.log('Database synced');
    app.listen(3001, () => {
        console.log("Server listening on port 3001");
    });
});