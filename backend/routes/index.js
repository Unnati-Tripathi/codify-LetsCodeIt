var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var userModel = require("../models/userModels");
var jwt = require("jsonwebtoken");
var projectModel = require("../models/projectModels");
const axios = require("axios");


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const secret = process.env.JWT_SECRET ; 

router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCon = await userModel.findOne({ email: email });
  
  if (emailCon) {
    return res.json({ success: false, message: "This Email already exists" });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        try {
          await userModel.create({
            username: username,
            name: name,
            email: email,
            password: hash
          });
          return res.json({ success: true, message: "User created Successfully" });
        } catch (error) {
          return res.json({ success: false, message: "Error creating user" });
        }
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch === true) {
        const currentSecret = process.env.JWT_SECRET ;
        let token = jwt.sign({ email: user.email, userId: user._id }, currentSecret);
        return res.json({ success: true, message: "Logged in Successfully", token: token, userId: user._id });
      } else {
        return res.json({ success: false, message: "Invalid Id or Password" });
      }
    });
  } else {
    return res.json({ success: false, message: "User Not Found..!" });
  }
});

router.post("/getUserDetails", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    return res.json({ success: true, message: "user details fetched successfully", user: user });
  } else {
    return res.json({ success: false, message: "User not found" });
  }
});



router.post("/createProject", async (req, res) => {
  let { userId, title, projectType } = req.body; 
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.create({
      title: title,
      createdBy: userId,
      projectType: projectType || "html" 
    });
    return res.json({ success: true, message: "Project created!", projectId: project._id });
  } else {
    return res.json({ success: false, message: "User not found" });
  }
});




router.post("/getProjects", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let projects = await projectModel.find({ createdBy: userId });
    return res.json({ success: true, message: "Projects fetched", projects: projects });
  } else {
    return res.json({ success: false, message: "User Not Found" });
  }
});

router.post("/deleteProject", async (req, res) => {
  let { userId, progId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    await projectModel.findByIdAndDelete({ _id: progId });
    return res.json({ success: true, message: "Project Deleted Successfully!" });
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});

router.post("/getProject", async (req, res) => {
  let { userId, projId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOne({ _id: projId });
    return res.json({ success: true, message: "Project fetched successfully", project: project });
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});

router.post("/updateproject", async (req, res) => {
  let { userId, projId, htmlCode, cssCode, jsCode } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndUpdate(
      { _id: projId },
      { htmlCode, cssCode, jsCode },
      { new: true }
    );
    if (project) {
      return res.json({ success: true, message: "Project updated successfully" });
    } else {
      return res.json({ success: false, message: "Project not found" });
    }
  } else {
    return res.json({ success: false, message: "User not found" });
  }
});

router.post("/saveWebProject", async (req, res) => {
  let { userId, projId, htmlCode, cssCode, jsCode } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndUpdate(
      { _id: projId },
      { htmlCode, cssCode, jsCode },
      { new: true }
    );
    return project 
      ? res.json({ success: true, message: "Web project saved" }) 
      : res.json({ success: false, message: "Project not found" });
  }
  res.json({ success: false, message: "User not found" });
});

router.post("/saveCompilerProject", async (req, res) => {
  let { userId, projId, code } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndUpdate(
      { _id: projId },
      { code }, 
      { new: true }
    );
    return project 
      ? res.json({ success: true, message: "Compiler project saved" }) 
      : res.json({ success: false, message: "Project not found" });
  }
  res.json({ success: false, message: "User not found" });
});




router.post("/compiler/run", async (req, res) => {
  try {
    const { code, language_id, userInput } = req.body;
    
    const options = {
      method: 'POST',
      url: `https://${process.env.RAPIDAPI_HOST}/submissions`,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      },
      data: {
        source_code: code,
        language_id: language_id,
        stdin: userInput || ""
      }
    };

    const response = await axios.request(options);
    res.json({ success: true, token: response.data.token });
  } catch (error) {
    console.error("Compiler Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Compiler Service Error" });
  }
});

router.get("/compiler/status/:token", async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: `https://${process.env.RAPIDAPI_HOST}/submissions/${req.params.token}`,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      }
    };
    const response = await axios.request(options);
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Status Fetch Error" });
  }
});
module.exports = router;