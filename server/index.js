const express = require("express");
const app = express();
require("dotenv").config();
const multer = require("multer");
const upload = multer({
  dest: "./uploads/",
});
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./MiddleWare/Auth");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const User = require("./models/User");
const cors = require("cors");
const port = 3002;
app.use(express.json());
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const AssetDB = require("./models/Assets");
const AllDept = require("./models/AllDept");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const csvtojson = require("csvtojson");

var AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

const mongoose = require("mongoose");
const db = process.env.DATABASE;
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const Json2csvParser = require("json2csv").Parser;
app.post("/islogedin", auth, async (req, res) => {
  res.status(266).json({ message: "User Loged In" });
});

app.post("/addasset", auth, async (req, res) => {
  try {
    const newasset = new AssetDB(req.body);
    newasset._id = req.body.UID;
    const success = await newasset.save();
    if (success) {
      res.json({ message: "Added Successfully" });
    } else {
      res.json({ err: "Error adding data" });
    }
  } catch (err) {
    res.json({ err: "Error adding data", code: err.code });
  }
});

app.get("/addasset/:uid", auth, async (req, res) => {
  const uid = req.params.uid;
  try {
    var newdata = await AssetDB.find({ UID: uid });
    if (newdata) res.json(newdata);
  } catch (err) {
    res.json({ err: err });
  }
});

app.post("/updateAsset", auth, async (req, res) => {
  const uid = req.body.UID;
  AssetDB.findByIdAndUpdate(uid, req.body, function (err, docs) {
    if (err) {
      console.log(err);
      res.json({ err: "Error Updating data", code: err.code });
    } else {
      console.log("success");
      res.json({ message: "Updated Successfully" });
    }
  });
});

app.post("/deleteasset", auth, async (req, res) => {
  var a = 0;
  const uid = req.body.UID;
  console.log("deleting" + uid);
  try {
    const a = await AssetDB.deleteOne({ UID: uid });
    res.json({ success: " Deleted successfully" });
  } catch (err) {
    res.json({ err: "Error Deleting", code: err.code });
  }
});

app.post("/photodept", auth, upload.single("fileInput"), async (req, res) => {
  const file = req.file;
  console.log(file.mimetype);
  //    if(file.mimetype!=="text/csv")
  //    {
  //      console.log("Not a CSV File!!..deleting file");
  //      res.send("Not a CSV File!!");
  //    }
  //    else
  //    {
  //      try{
  //    await csvtojson().fromFile(file.path).then( async source => {
  //       var i,cnt=0,tot=source.length;
  //         try{
  //           for (i = 0; i < source.length; i++) {
  //           const newasset=new AssetDB(source[i]);
  //           newasset._id=source[i].UID;
  //           const success=await newasset.save();
  //             cnt++;
  //           }
  //         }catch(err) {
  //            res.send(err.message+" ...first "+cnt+" entries were added ");
  //         };

  //       if(file &&tot===cnt)
  //   {
  //    res.send("All Entries were added successfully");
  //   }
  //   });
  // }
  // catch(err)
  // {
  //   console.log(err);
  // }

  //    }
  //    try{
  //    await unlinkAsync(file.path).then(function (response)
  //    {
  //      console.log("file Deleted!");
  //    });
  //   }
  //   catch(err){
  // console.log(err);
  //   }
});

app.post("/importCSV", auth, upload.single("fileInput"), async (req, res) => {
  const file = req.file;
  const department = req.body.Department;
  console.log(department);
  console.log(req.file);
  if (file.mimetype !== "text/csv") {
    console.log("Not a CSV File!!..deleting file");
    res.send("Not a CSV File!!");
  } else {
    try {
      await csvtojson()
        .fromFile(file.path)
        .then(async (source) => {
          var i,
            cnt = 0,
            tot = source.length;
          try {
            for (i = 0; i < source.length; i++) {
              source[i].append("Department", department);
              const newasset = new AssetDB(source[i]);
              newasset._id = source[i].UID;
              const success = await newasset.save();
              cnt++;
            }
          } catch (err) {
            res.send(err.message + " ...first " + cnt + " entries were added ");
          }
          if (file && tot === cnt) {
            res.send("All Entries were added successfully");
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  try {
    await unlinkAsync(file.path).then(function (response) {
      console.log("file Deleted!");
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/alldata", auth, async (req, res) => {
  try {
    var data = await AssetDB.find({});
    var jsonData = JSON.parse(JSON.stringify(data));
    const json2csvParser = new Json2csvParser({ header: true });
    const csv = json2csvParser.parse(jsonData);
    fs.writeFile("WCE_AssetRegister.csv", csv, function (error) {
      if (error) throw error;
      console.log("File generated  successfully!");
      res.setHeader(
        "Content-disposition",
        "attachment; filename=WCE_AssetRegister.csv"
      );
      res.setHeader("Content-Type", "text/csv");
      res.download(__dirname + "/WCE_AssetRegister.csv", function (err) {
        if (err) {
          console.log(err);
        }
        res.end();
      });
    });
  } catch (err) {
    console.log(err);
  }
});

//with uid
app.get("/viewasset/:uid", auth, async (req, res) => {
  const uid = req.params.uid;
  try {
    var newdata = await AssetDB.find({ UID: uid });
    if (newdata) res.json(newdata);
  } catch (err) {
    res.json({ err: err });
  }
});

//with dept name +type+eqp name
app.post("/viewasset", async (req, res) => {
  const EqpType = req.body.EqpType;
  const NameOfEqp = req.body.NameOfEqp;
  const data = await AssetDB.find({
    EqpType: EqpType,
    NameOfEqp: NameOfEqp,
  });
  res.json(data);
});

//with type+eqp name
app.post("/viewasset/choose", async (req, res) => {
  const EqpType = req.body.EqpType;
  const NameOfEqp = req.body.NameOfEqp;
  const Department = req.body.Department;
  const data = await AssetDB.find({
    EqpType: EqpType,
    NameOfEqp: NameOfEqp,
    AssetNumber: { $regex: Department },
  });
  res.json(data);
});

app.post("/viewasset/choose2", async (req, res) => {
  const Department = req.body.Department;
  const data = await AssetDB.find({
    AssetNumber: { $regex: Department },
  });

  res.json(data);
});

app.get("/viewasset/sort", auth, async (req, res) => {
  const uid = req.params.uid;
  const data = await AssetDB.find({
    UID: uid,
  });
  res.json(data);
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (isMatch) {
        const token = await userLogin.generateAuthToken();
        res.cookie("ASSETREGISTRY", token, {
          expires: new Date(Date.now() + 51840000),
          httpOnly: true,
        });
        console.log(token);
        res.status(201).json({ message: "Logged in success", cookie: token });
      } else {
        res.status(231).json({ error: "Invalid Credentials" });
      }
    } else {
      res.status(231).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/register", auth, async (req, res) => {
  const { username, email, password, deptID } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    const userNamexist = await User.findOne({ username: username });
    if (userExist) {
      return res.status(230).json({ error: "User alredy exist" });
    }
    if (userNamexist) {
      return res.status(230).json({ error: "User Name alredy exist" });
    }
    const user = new User({ email, deptID, username, password });
    const userRegistered = await user.save();
    if (userRegistered) {
      res.status(201).json({ message: "User registered Successfully" });
    } else {
      res.status(203).json({ message: "Falied to register" });
    }
  } catch (err) {
    res.status(203).json({ message: "Falied to register", error: err });
    console.log(err);
  }
});

app.get("/logout", auth, async (req, res) => {
  res.cookie("ASSETREGISTRY", "", { expires: new Date(1) });
  res.clearCookie("ASSETREGISTRY");
  return res.status(201).json({ message: "SuccessFuly Logout" });
});

app.post("/verifyotp", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email });
    if (!user) {
      return res.status(266).json({ message: "Error occured 2" });
    } else {
      const OTP = user.OTP;
      if (OTP == req.body.OTP) return res.status(201);
      else return res.status(202);
    }
  } catch (error) {
    console.log(error);
    return res.status(266).json({ message: "Error occured 1" });
  }
});
app.post("/validateOTP", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && user.OTP == req.body.OTP) {
      console.log("otp verified");
      return res.status(244).json({ message: "OTP verified" });
    } else {
      console.log("otp not verified");
      return res.status(266).json({ message: "OTP verification failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(266).json({ message: "OTP verification failed 1" });
  }
});
app.post("/getOTPforget", async (req, res) => {
  try {
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });
    const email = user.email;
    const name = user.username;
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    const filter = {
      email: email,
    };
    const update = {
      OTP: OTP,
    };

    const success = await User.findOneAndUpdate(filter, update);
    if (!success) {
      return res.status(266).json({ message: "Error occured 2" });
    } else {
      mail(OTP, email, name);
      return res.status(201).json({ message: "OTP has been sent.." });
    }
  } catch (error) {
    console.log(error);
    return res.status(266).json({ message: "Error occured 1" });
  }
});

app.get("/getOTP", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email });
    const email = user.email;
    const name = user.username;
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    const filter = {
      email: email,
    };
    const update = {
      OTP: OTP,
    };

    const success = await User.findOneAndUpdate(filter, update);
    if (!success) {
      return res.status(266).json({ message: "Error occured 2" });
    } else {
      mail(OTP, email, name);
      return res.status(201).json({ message: "OTP has been sent.." });
    }
  } catch (error) {
    console.log(error);
    return res.status(266).json({ message: "Error occured 1" });
  }
});

app.post("/setnewpass", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const email = user.email;
    var password = req.body.pass; ///new pass
    password = await bcrypt.hash(password, 12);
    const filter = {
      email: email,
    };
    const update = {
      password: password,
    };

    const success = await User.findOneAndUpdate(filter, update);
    if (!success) {
      console.log("Error pass");
      return res.status(255).json({ message: "Error occured" });
    } else {
      console.log("Error pass");
      return res.status(244).json({ message: "Password Changed Successfully" });
    }
  } catch (error) {
    console.log("Error pass");
    console.log(error);
    return res.status(255).json({ message: "Error occured" });
  }
});

app.patch("/forgotPassword", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not exist" });
    }

    var OTP = Math.random() * 1000000;
    OTP = Math.floor(OTP) + "WCE";
    var password = OTP;
    password = await bcrypt.hash(password, 12);
    const filter = {
      email: email,
    };
    const update = {
      password: password,
    };
    const success = await User.findOneAndUpdate(filter, update);
    if (!success) {
      return res.status(400).json({ message: "Error occured" });
    }

    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "placementapp1234@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "TPO@WCE <placementapp1234@gmail.com>",
      to: email,
      subject: "Hello from gmail using API",
      text: "Your New Password for PlacementAssist is:" + OTP,
      // html: '<h1>Hello from gmail email using API</h1>',
    };
    const result = await transport.sendMail(mailOptions);
    if (result) {
      return res.status(201).json({ message: "Mail Sent Success" });
    } else {
      return res.status(203).json({ message: "Falied to send" });
    }
  } catch (error) {
    console.log(error);
  }
});

function mail(OTP, email, name) {
  const data = '{"User":"' + name + '","OTP":"' + OTP + '"}';
  console.log(name);
  var params = {
    Destination: {
      CcAddresses: [],
      ToAddresses: [email],
    },
    Source: "wce.asset.registry@gmail.com" /* required */,
    Template: "OTP" /* required */,
    TemplateData: data,
    /* required */ ReplyToAddresses: ["wce.asset.registry@gmail.com"],
  };
  try {
    var sendPromise = new AWS.SES({
      accessKeyId: "AKIA533U6AWI6MKHV3XV",
      secretAccessKey: "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",
      apiVersion: "2010-12-01",
    })
      .sendTemplatedEmail(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then(function (data) {
        console.log("Success mail");
        console.log(data.MessageId);
      })
      .catch(function (err) {
        console.log("Error sendin mail");
        console.error(err, err.stack);
      });
  } catch (e) {
    console.log(e);
  }
}

app.get("/getalladmin", auth, async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(266).json({ message: "Error occured 2" });
    } else {
      return res.status(201).json({ users: users });
    }
  } catch (error) {
    console.log(error);
    return res.status(266).json({ message: "Error occured 1" });
  }
});
app.post("/deleteadmin", auth, async (req, res) => {
  try {
    const usersdeleted = await User.findOneAndDelete({
      email: req.body.email,
    });
    if (!usersdeleted) {
      return res.status(266).json({ message: "Error occured 2" });
    } else {
      console.log("Admin deleted " + req.body.email);
      return res.status(201).json({ message: "Admin Deleted" });
    }
  } catch (error) {
    console.log(error);
    return res.status(266).json({ message: "Error occured 1" });
  }
});

app.get("/alldeptinfo", async (req, res) => {
  try {
    var newdata = await AllDept.find();
    if (newdata) res.status(201).json(newdata);
  } catch (err) {
    res.status(266).json({ err: err });
  }
});

app.get("/deptinfo", auth, async (req, res) => {
  try {
    var newdata = await AllDept.find({ deptID: req.body.department });
    if (newdata) res.status(201).json(newdata);
  } catch (err) {
    res.status(266).json({ err: err });
  }
});

app.post("/adddept", auth, async (req, res) => {
  try {
    const newDept = new AllDept(req.body);
    const success = await newDept.save();
    if (success) {
      return res.status(201).json({ message: " Dept Added Successfully" });
    } else {
      return res.status(266).json({ err: "Error adding data" });
    }
  } catch (err) {
    console.log(err);
    return res.status(266).json({ err: "Error adding data", code: err.code });
  }
});

app.get("/userdetails", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.email });

    if (!user) {
      return res.status(266).json({ message: "Error occured 2" });
    } else {
      const email = user.email;
      const name = user.username;
      const deptID = user.deptID;
      return res.status(201).json({ email: email, name: name, dep: deptID });
    }
  } catch (error) {
    console.log(error);
    return res.status(266).json({ message: "Error occured 1" });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}!`);
});
