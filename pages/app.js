import { useState } from "react";

export default function App(){
const [data,setData]=useState({
nomA:"",nomB:"",immA:"",immB:"",
date:"",lieu:"",
cases:["1","3"],
signatureA:null,
signatureB:null,
sketch:null
});

const generate=async()=>{
const res=await fetch("/api/pdf",{method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)});
const blob=await res.blob();
const url=URL.createObjectURL(blob);
const a=document.createElement("a");
a.href=url;a.download="constat.pdf";a.click();
};

return <div style={{padding:20}}>
<h2>Constat</h2>

<input placeholder="Nom A" onChange={e=>setData({...data,nomA:e.target.value})}/><br/>
<input placeholder="Immatriculation A" onChange={e=>setData({...data,immA:e.target.value})}/><br/>

<input placeholder="Nom B" onChange={e=>setData({...data,nomB:e.target.value})}/><br/>
<input placeholder="Immatriculation B" onChange={e=>setData({...data,immB:e.target.value})}/><br/>

<input placeholder="Date" onChange={e=>setData({...data,date:e.target.value})}/><br/>
<input placeholder="Lieu" onChange={e=>setData({...data,lieu:e.target.value})}/><br/>

<h3>Cases</h3>
<label><input type="checkbox" onChange={()=>setData({...data,cases:["1"]})}/>Cas 1</label>

<br/><br/>
<button onClick={generate}>PDF FINAL</button>
</div>
}