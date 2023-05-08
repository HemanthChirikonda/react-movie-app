import React, { useEffect, useState } from "react";
import {Movie} from "./variableTypes"
import "./MovieForm.css"
import axios from "axios";
import { redirect, useParams } from "react-router";

export interface Props{
    movie?:Movie 
}

const api= axios.create({
    baseURL:"http://localhost:8080/movies",

});

export default function MovieForm(props:Props) {
        
    const [movieName, setMovieName]= useState(props.movie?.name);
    const [movieDesc, setMovieDesc]= useState(props.movie?.desc);
    const {id} = useParams();
   const onchangeName=(event:React.FormEvent<HTMLInputElement>)=>{
    setMovieName(event.currentTarget.value);
   }
   const onchangeDesc=(event:React.FormEvent<HTMLTextAreaElement>)=>{
    setMovieDesc(event.currentTarget.value);
   }
  
   const onClick=async(event:React.FormEvent)=>{
    event.preventDefault();
    if(id){
        const data=await api.put("/edit/"+id,{name:movieName,desc:movieDesc}, {headers:{"Content-Type":"application/json"}});
        console.log(data);
       
    }else{
        const data=await api.post("/save",{name:movieName,desc:movieDesc}, {headers:{"Content-Type":"application/json"}});
        console.log(data);
    }
    
    window.location.href= "http://localhost:3000/movies";
   }
   const getmovie=async(id:number)=>{
    const data:any= await api.get("/"+id);
    console.log(data)
    setMovieName(data.data.name);
    setMovieDesc(data.data.desc);
 }

   useEffect(()=>{
if(id){
      getmovie(parseInt(id));
}
   },[])


  return (
    <>
      <div className="formContainer">
        <form className="form"> 
          <div className="row formGroup">
            <label className="label">Movie Name</label>
            <div className="inputContainer">
              <input
                type={"text"}
                required
                placeholder="Enter Movie Name"
                maxLength={45}
                defaultValue={movieName }
                onChange={onchangeName}
              />
            </div>
          </div>

          <div className="row formGroup">
            <label className="label">Movie Discription</label>
            <div className="inputContainer">
              <textarea
                name="movieDesc"
                id="movieDesc"
                cols={20}
                rows={10}
                required
                placeholder="Enter Movie Discription"
                defaultValue={ movieDesc }
                onChange={onchangeDesc}
                maxLength={250}
              />
            </div>
          </div>
          <div className="row formGroup">
          <div className="row">
              <button className="btn" value="Save" onClick={onClick} >Save</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
