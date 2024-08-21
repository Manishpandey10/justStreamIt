import express from "express";
import cors from "cors";
import {v4 as uuidv4} from "uuid";
import multer from "multer";
import path from "path"
import fs from "fs"
import { exec } from "child_process";
import { error } from "console";
import { stderr, stdout } from "process";

const app = express()

const storage = multer.diskStorage(
    {
        destination:function(req, file, cb)
        {
            cb(null, "./uploads" )
        },
        filename: function(req,file,cb){
            cb(null, file.fieldname + "-" + path.extname(file.originalname))
        }
    }
)
//configuring multer
const upload = multer({storage: storage})

//
app.get('/',(req, res)=>{
    res.json({message :"hello bhai log"}) 
})

app.use(
    cors({
        origin:["https:/localhost:3000", "https:/localhost:5173", "https:/localhost:8000"]
        ,
        credential :true
    })
)

app.use((req, res, next )=>{
    res.header("Access-Control-Allow-Origin " )
    res.header(
        "Access-Control-Allow-Headers",
        "Orgin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json())
app.use("/uploads",express.static("uploads"))
app.use(express.urlencoded({extended: true}))

app.post("/upload", upload.single("file"),function(req, res){

    const vidId = uuidv4()
    const videoPath = req.file.path;
    const outPath = `./uploads/playlist/${vidId}`
    const hlsPath = `${outPath}/index.m3u8`
    console.log("hlsPath", hlsPath);

    if(!fs.existsSync(outPath)){
        fs.mkdirSync(outPath, {recursive: true});
    }
    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;
     
    exec(ffmpegCommand,(error,stdout,stderr)=>{
       if(error){
        console.log(`error: ${error}`);
       } 
       console.log(`stdout: ${stdout}`);
       console.log(`stderr: ${stderr}`);
       const videoUrl =`https://localhost:8000/uploads/playlist/${vidId}/index.m3u8`;

       res.json({
        message:" Video converted to hls format "
        , 
        videoUrl: videoUrl,
        videoId : vidId
       })
    })
    
})
app.listen(8000, function(){
    console.log("app running @ 8000 .......");
    
})