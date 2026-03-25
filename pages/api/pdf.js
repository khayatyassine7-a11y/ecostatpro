import { PDFDocument, rgb } from "pdf-lib";
import fs from "fs";

export default async function handler(req,res){
const data=req.body;
const pdf=await PDFDocument.create();

let page;
try{
const img=fs.readFileSync("public/constat-template.jpg");
const jpg=await pdf.embedJpg(img);
page=pdf.addPage([595,842]);
page.drawImage(jpg,{x:0,y:0,width:595,height:842});
}catch{
page=pdf.addPage([595,842]);
}

const draw=(t,x,y)=>page.drawText(t||"",{x,y,size:10,color:rgb(0,0,0)});

draw(data.nomA,60,650);
draw(data.immA,60,620);

draw(data.nomB,350,650);
draw(data.immB,350,620);

draw(data.date,200,750);
draw(data.lieu,350,750);

// cases
if(data.cases?.includes("1")){
page.drawText("✔",{x:280,y:500,size:14});
}

const bytes=await pdf.save();
res.setHeader("Content-Type","application/pdf");
res.send(Buffer.from(bytes));
}