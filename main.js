// You have to write a Node.js program to clear clutter inside of a directory and organize the contents of that directory into different folders

// for example, these files become:

// 1. name.jpg
// 2. name.png
// 3. this.pdf 
// 4. harry.zip
// 5. Rohan.zip
// 6. cat.jpg 
// 7. harry.pdf

// this: 
// jpg/name.jpg, jpg/cat.jpg 
// png/name.png 
// pdf/this.pdf pdf/harry.pdf
// zip/harry.zip zip/Rohan.zip
const fs=require('fs')
const path=require('path')
let mpath="C:\\Users\\Admin\\Desktop\\WT\\js\\node\\express\\prac\\donwloads"
const port=3000
// console.log(path.dirname(mpath));
// console.log(path.basename(mpath))
const folder="./donwloads/"
fs.readdirSync(folder).forEach(file=>{
    let fname=(path.extname(file)).slice(1)
    const mdir=path.join(path.dirname(folder),fname)
    if(!fs.existsSync(mdir))
    {
       fs.mkdir(mdir,{recursive:true},(err)=>{
        if(err)
            {
                console.log(`directory:${fname} exists`)
            }else{
                console.log(`${fname} is created`)
            }
       })
    }else{
        console.log("<---------------Directory already created-------------------->")
    }
    const src=path.join(folder,file)
    const destn=path.join(mdir,file)
       
       console.log(file,destn)
       fs.rename(src,destn,(err)=>{
        if(err)
        {
            console.log("Error!!!!!!!!!!!",err,destn)
        }else{
            console.log(`${file} uploaded successfully to ${destn}`)
        }
       })
})


