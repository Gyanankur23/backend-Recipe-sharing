const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("../config/db");
const User = require("./models/User.model");
const Recipe = require("./models/Recipe.model");
const Rating = require("./models/Rating.model");
const Comment = require("./models/Comment.model");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3001"
}));
app.use(express.json());

const handleError = (err, res) => {
    console.error(err);
    res.status(500).json({ error: err.message });
};
app.get("/", async (req, res) => {
   console.log("Root api was accessed");
   await User.findAll({})
       .then((users) => {
           return res.json({ users: users });
       })
       .catch((err) => {
           return res.json({ err: err });
       })
})
app.get("/users", async (req, res) => {
    console.log("Root api was accessed");
    await User.findAll({})
        .then((users) => {
            return res.json({ users: users });
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.get("/recipes", async (req, res) => {
    console.log("Root api was accessed");
    await Recipe.findAll({})
        .then((recipes) => {
            return res.json({ recipes: recipes });
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.get("/comments", async (req, res) => {
    console.log("All comment api was accessed");
    await Comment.findAll({})
        .then((comments) => {
            return res.json({ comments: comments });
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.get("/users/user", async (req, res) => {
    console.log("User api was accessed");
    const { id } = req.query;
    await User.findOne({ where: { id: Number(id) } })
        .then((users) => {
            if (users) {
                return res.json({ users: users });
            }
            else {
                return res.json({ message: "User not found" });
            }

        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.get("/recipes/recipe", async (req, res) => {
    console.log("Recipe api was accessed");
    const { id } = req.query;
    await Recipe.findOne({ where: { id: Number(id) } })
        .then((recipes) => {
            if (recipes) {
                return res.json({ recipes:recipes });
            }
            else {
                return res.json({ message: "Recipe not found" });
            }
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.get("/comments/comment", async (req, res) => {
    console.log("Comment api was accessed");
    const { recipeId } = req.query;
    await Comment.findAll({ where: { recipeId: Number(recipeId) } })
        .then((comments) => {
            if (comments) {
                return res.json({ comments:comments });
            }
            else {
                return res.json({ message: "Comments not found" });
            }
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.get("/users/user/usrcmmts", async (req, res) => {
    console.log("Comment api was accessed");
    const { userId } = req.query;
    await Comment.findAll({ where: { userId: Number(userId) } })
        .then((recipes) => {
            if (recipes) {
                return res.json({ recipes:recipes });
            }
            else {
                return res.json({ message: "Comments not found" });
            }
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.put("/users/user/usernme", async (req, res) => {
    const { id, username } = req.body;
    await User.update({ username: username },
        { where: { id: Number(id) } })
        .then((users) => {
            if (users) {
                return res.json({message:"Username Updated Successfully" });
            }
            else {
                return res.json({ message: "User not found" });
            }
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.put("/users/user/userpwd", async (req, res) => {
    const { username, password } = req.body;
    await User.update({ password: password },
        { where: { username:username } })
        .then((users) => {
            if (users) {
                return res.json({message:"Password Updated Successfully" });
            }
            else {
                return res.json({ message: "User not found" });
            }
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.put("/recipes/recipe/recipetle", async (req, res) => {
    const { id, title } = req.body;
    await Recipe.update({ title: title },
        { where: { id: Number(id) } })
        .then((recipetle) => {
            if (recipetle) {
                return res.json({message:"Title Update Successfully" });
            }
            else {
                return res.json({ message: "Recipe not found" });
            }
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.put("/recipes/recipe/recipecnt", async (req, res) => {
    const { id, content } = req.body;
    await Recipe.update({ content },
        { where: { id: Number(id) } })
        .then((recipecnt) => {
            if (recipecnt) {
                return res.json({message:"Content Update Successfully" });
            }
            else {
                return res.json({ message: "Recipe not found" });
            }
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.put("/comments/comment/commentup", async (req, res) => {
    const { recipeId, text, userId } = req.body;
    await Comment.update({text:text },
        { where: { recipeId, userId} })
        .then((text) => {
            if (text) {
                return res.json({message:"Comment Update Successfully" });
            }
            else {
                return res.json({ message: "Comment not found" });
            }
        })
        .catch((err) => {
            return res.json({ err: err });
        })
})
app.post("/", async (req, res) => {
    const { username, password } = req.body;
    await User.create({ username, password })
        .then((createdUser) => {
            res.json({
                message: "Data saved successfully"
            })
        })
        .catch((error) => {
            res.json({
                error
            })
        })

})
app.post("/user", async (req, res) => {
    const { username, password } = req.body;
    await User.create({ username, password })
        .then((createdUser) => {
            res.json({
                message: "Data saved successfully"
            })
        })
        .catch((error) => {
            res.json({
                error
            })
        })

})
app.post("/recipe", async (req, res) => {
    const { title, content } = req.body;
    await Recipe.create({ title, content })
        .then((createdRecipe) => {
            res.status(200).json({
                message: "Data saved successfully"
            })
        })
        .catch((error) => {
            res.status(500).json({
                error
            })
        })

})
app.post("/comment", async (req, res) => {
    let { text, recipeId, userId } = req.body;
    recipeId = parseInt(recipeId);
    userId = parseInt(userId);
    await Comment.create({ text, recipeId, userId})
        .then((createdComment) => {
            res.status(200).json({
                message: "Comment saved successfully"
            })
        })
        .catch((error) => {
            res.status(500).json({
                error
            })
        })

})
sequelize.sync().then(async () => {
    console.log('Database synced');
    app.listen(3001, () => {
        console.log("Server listening on port 3001")
    })
})
