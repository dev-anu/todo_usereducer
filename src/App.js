import './App.css';
import {useState,useReducer} from 'react';

function reducer(todos,action){
 switch(action.type){
   case "add_todo":
     return [...todos,newTodo(action.payload.name)]
   case "delete":
     const SingleTodo = todos.filter(todo=> todo.id !== action.payload.id);
      todos = [...SingleTodo];
     return todos;
   case "done":
     const tempData=[];
   const tempOp =todos.map(todo=>{
     if(todo.id === action.payload.id){
       todo.complete =true;
     }
     tempData.push(todo);
   })
    todos = [...tempData];
    return todos;
 }
}

function newTodo(name){
  return {id:Math.random(),name:name,complete:false};
}

function App() {
  const [todos,dispatch]=useReducer(reducer,[]);
  const [name,setName]=useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch({type:"add_todo",payload:{name:name}});
    setName('');
  }

  const handleDelete=(id)=>{
    dispatch({type:'delete',payload:{id:id}})
  }

  const handleDone=(id)=>{
    dispatch({type:'done',payload:{id:id}});
  }
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit} style={{margin:"20px auto"}}>
        <input type="text" value={name} onChange={e=>setName(e.target.value)} style={{width:"60%",height:"30px",fontSize:"20px",border:"none",borderBottom:"1px solid #ededed"}}/>
        <button type="submit" style={{marginLeft:"10px", padding:"10px"}}>Add Todo</button>
      </form>
      <div>{todos.map(todo=>{return(<div><p>{todo.complete? <s>{todo.name}</s>:<span>{todo.name}</span>}</p><button onClick={()=>handleDone(todo.id)}>Done</button><button onClick={()=>handleDelete(todo.id)}>Delete</button></div>)})}</div>
    </div>
  );
}

export default App;
