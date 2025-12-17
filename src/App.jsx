import { useRef, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();

  function handleForm(e) {
    e.preventDefault();
    const newObj = {
      text: todoRef.current.value,
      isDeleted: false,
      btn: "Delete This Todo",
      bgColor: "red"
    };
    setTodos([...todos, newObj]);

    console.log(todoRef.current.value);
    todoRef.current.value = "";
  }
  function deleteTodo(id) {
    const newArr = todos.map((elem, indx)=>{
        if(indx === id){
            const deleteBtnText = elem.isDeleted ?  "Delete This Todo" : "Undo Delete";
            const bgColor = elem.isDeleted ?  "red" : "green";
            return {...elem, isDeleted: !elem.isDeleted, btn: deleteBtnText, bgColor: bgColor};
        }

        return elem;
    });

    setTodos(newArr);
  }
  return (
    <>
      <h1>TODO App</h1>
      <form onSubmit={handleForm}>
        <input ref={todoRef} type="text" />
      </form>

      <h3>
        <ul>
          {todos.map((elem, indx) => {
            return (
              <div key={indx}>
                <li style={{
                    marginTop: "10px"
                }}>
                  {elem.isDeleted ? <s>{elem.text}</s> : elem.text}
                  <button
                  onClick={()=>{
                    deleteTodo(indx);
                  }}
                    style={{
                      background: elem.bgColor,
                      color: "white",
                      borderRadius: "5px",
                      border: 0,
                      marginLeft: "10px",
                      padding: "7px",
                    }}
                  >
                    {elem.btn}
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
      </h3>
    </>
  );
}
