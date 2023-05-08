import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./UserTable.css"
import { Movie } from "./variableTypes";
import axios from "axios";
import { async } from "q";

const api= axios.create({
    baseURL:"http://localhost:8080/movies"
});

export default function UsersTable(){

    const [movies, setmovies] = useState<Movie[]>([ {id:1,name:'transforms',desc:"xcvghjhgfvcvbn"}, {id:2,name:'transforms',desc:"xcvghjhgfvcvbn"}]);
    
    const getmovies=async()=>{
       const data:any= await api.get("/");
       console.log(data)
       setmovies(data.data);
    }
    const deleteMovie=async(id:number)=>{
        const data:any= await api.delete("/delete/"+id);
        console.log(data);
    }


  useEffect( ()=>{
    
    getmovies();
  
  },[])  

    const onDelete=(id:number)=>{
        deleteMovie(id);
        setmovies(movies.filter(moive=>(moive.id !=id)));
    };


    return <>

    <div className="mainContainer"> 
        <div>
            <Link to={"/movies/new"}><button>Add Movie</button></Link>
        </div>
       <div className="tableContainer">

        <div className="tableRow" style={{fontWeight:"800"}}> 
            <div className="col-1">
                ID
            </div>
            <div className="col-2">
                  Name
            </div>
            <div className="col-4">
                  Desc
            </div>
            <div className="col-3">
            Actions
            </div>
        </div>
       {
        movies.length ?? movies.map((movie, idx)=>
            
     <>
        <div className="tableRow bodyRow">
        <div className="col-1">
            {movie.id}
        </div>
        <div className="col-2">
        {movie.name}
        </div>
        <div className="col-4">
        {movie.desc}
        </div>
        <div className="col-3">
        <Link to={"/movies/update/"+movie.id}><button>Edit</button></Link>
       <button onClick={()=>{onDelete(movie.id)}}>Delete</button>
        </div>
       </div>
       </>
        )
       }
       </div>


    </div>    
    </>
}