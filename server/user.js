const express = require("express");
const Router = express.Router();
const model = require("./model");
const utils = require("utility");
const User = model.getModel("user");
const _filter = { pwd: 0, __v: 0 };
Router.post("/login", function(req, res) {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function(err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: "用户名或者密码错误" });
        }
        res.cookie("userid", doc._id);
        return res.json({ code: 0, data: doc });
    });
});
Router.post("/register", function(req, res) {
    const { user, pwd, type } = req.body;
    User.findOne({ user }, function(err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: "用户名重复" });
        }
        const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
        userModel.save(function(e, d) {
            console.log(d, 999999);
            if (e) {
                return res.json({ code: 1, msg: "后端出错了" });
            }
            const { user, type, _id } = d;
            res.cookie("userid", _id);
            return res.json({ code: 0, data: { user, type, _id } });
        });
    });
});
Router.get("/list", function(req, res) {
    User.find({}, function(err, data) {
        return res.json(data);
    });
});
function md5Pwd(pwd) {
    const salt = "imooc_is_good_3957x8yza6!@#IUHJh~~";
    return utils.md5(utils.md5(pwd + salt));
}
module.exports = Router;
