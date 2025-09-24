import userService from "../services/userService.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userViewController = {
    getRegisterView: (req, res) => {
    res.render('register');
    },
    getLoginView: (req, res) => {
        res.render('login');
    },
    postLoginView: async (req, res) => {
        console.log("Body received:", req.body);
        try {
        const { identifier, password } = req.body;

        const user = await userService.getByEmailOrUsername(identifier); 
        if (!user) return res.render("login", { error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.render("login", { error: "Invalid password" });

        res.redirect("/");
        } catch (err) {
        console.error(err);
        res.render("login", { error: "Something went wrong" });
        }
    },
    postRegisterView: async (req, res) => {
        console.log("Body received:", req.body);
        try {
        const { name, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);

        await userService.createUser(name, email, hashed, "user");

        res.redirect("/login");
        } catch (err) {
        console.error(err);
        res.render("register", { error: "Something went wrong" });
        }
    }
}

export default userViewController;