const express = require('express');
const app = express();
require('dotenv').config()
const multer  = require('multer')
const upload=multer({ 
  dest: './uploads/'
});
const cors=require("cors");
const port = 3002;
app.use(express.json());
app.use(cors());
const AssetDB=require("./models/Assets");
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const csvtojson = require('csvtojson');

const mongoose=require('mongoose');
const db=process.env.DATABASE;
mongoose.connect(db,{
    useNewUrlParser: true
})
.then(()=>{
    console.log("Connected to DB successfully");
})
.catch((err)=>{
    console.log(err);
});

const Json2csvParser = require("json2csv").Parser;
const { Mongoose } = require('mongoose');


app.post("/addasset",async (req,res)=>
{
  try{
   const newasset=new AssetDB(req.body);
   newasset._id=req.body.UID;
   const success=await newasset.save();
   if(success){
    res.json({ message: "Added Successfully" });
  }
  else{
    res.json({ err: "Error adding data" });
  }
  }catch(err) {
    res.json({ err: "Error adding data" ,code:err.code});
    }
  
});

app.get("/addasset/:uid",async (req,res)=>
{
  const uid=req.params.uid;
   try{
  var newdata=await AssetDB.find({UID:uid});
  if(newdata)
  res.json(newdata);
   }catch(err)
   {
    res.json({err:err});
   }
  
});



app.post("/updateAsset",async (req,res)=>
{
  const uid=req.body.UID;
  AssetDB.findByIdAndUpdate(uid, req.body,function (err, docs) {
    if (err){
      console.log(err);
      res.json({ err: "Error Updating data" ,code:err.code});
    }
    else{
      console.log("success");
      res.json({ message: "Updated Successfully" });
    }
});
});

app.post("/deleteasset",async (req,res)=>
{
  var a=0
  const uid=req.body.UID;
  console.log("deleting" +uid);
try{
  const a=await AssetDB.deleteOne({ UID: uid });
  res.json({success:" Deleted successfully"});
}
catch(err)
{
  res.json({err:"Error Deleting",code:err.code});
}  
});




app.post("/importCSV",upload.single("fileInput"),async (req,res)=>
{
 
   const file=req.file;
   console.log(req.file);
   if(file.mimetype!=="text/csv")
   {
     console.log("Not a CSV File!!..deleting file");
     res.send("Not a CSV File!!");
   }
   else
   {
     try{
   await csvtojson().fromFile(file.path).then( async source => {
      var i,cnt=0,tot=source.length;
        try{
          for (i = 0; i < source.length; i++) {
          const newasset=new AssetDB(source[i]);
          newasset._id=source[i].UID;
          const success=await newasset.save();
            cnt++;
          }
        }catch(err) {
           res.send(err.message+" ...first "+cnt+" entries were added ");
        };

      if(file &&tot===cnt)
  {
   res.send("All Entries were added successfully");
  }    
  });
}
catch(err)
{
  console.log(err);
}

   }
   try{
   await unlinkAsync(file.path).then(function (response)
   {
     console.log("file Deleted!");
   });
  }
  catch(err){
console.log(err);
  }
});



app.get("/alldata",async (req,res)=>
{ 
  try
  {
     var data=await AssetDB.find({}); 
  var jsonData=JSON.parse(JSON.stringify(data));
  const json2csvParser = new Json2csvParser({ header: true});
  const csv = json2csvParser.parse(jsonData);
  fs.writeFile("WCE_AssetRegister.csv", csv, function(error) {
    if (error) throw error;
    console.log("File generated  successfully!");
      res.setHeader('Content-disposition', 'attachment; filename=WCE_AssetRegister.csv');
      res.setHeader('Content-Type', 'text/csv');
       res.download(__dirname+"/WCE_AssetRegister.csv", function(err){
        if (err) {
          console.log(err);
        }
      res.end();
  });
});
  }
catch(err)
{
  console.log(err);
}


});



//with uid
app.get("/viewasset/:uid",async (req,res)=>
{
  const uid=req.params.uid;
   try{
  var newdata=await AssetDB.find({UID:uid});
  if(newdata)
  res.json(newdata);
   }catch(err)
   {
    res.json({err:err});
   } 
});


//with dept name +type+eqp name
app.post("/viewasset",async (req,res)=>
{
  const EqpType=req.body.EqpType;
  const NameOfEqp=req.body.NameOfEqp;
  const data= await AssetDB.find({
      EqpType: EqpType,
      NameOfEqp:NameOfEqp
  });
    res.json(data);
});


//with type+eqp name
app.post("/viewasset/choose",async (req,res)=>
{
  const EqpType=req.body.EqpType;
  const NameOfEqp=req.body.NameOfEqp;
  const Department=req.body.Department;
  const data= await AssetDB.find({
        EqpType: EqpType,
        NameOfEqp:NameOfEqp,
        AssetNumber:{ $regex: Department }
    }
  );
    res.json(data);

});


app.post("/viewasset/choose2",async (req,res)=>
{

  const Department=req.body.Department;
  const data= await AssetDB.find({
    AssetNumber:{ $regex: Department }
  });

    res.json(data);
  
});


app.get("/viewasset/sort",async (req,res)=>
{
  const uid=req.params.uid;
  const data= await AssetDB.find({
      UID: uid
  });
    res.json(data); 
  
});

   


app.listen(process.env.PORT||port, () => {
        console.log(`Example app listening on port ${port}!`)
      });

