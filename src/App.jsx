import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  ); //USAMOS O LOCALSTORAGE PARA ARMAZENAR OS DADOS INSERIDOS PELO USUARIO

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //CONVERTE A ARREY DE TAREFA EM STRING PARA ARMAZENAR
  }, [tasks]);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     //CHAMAR A API
  //     const Response = await fetch(
  //       "https://jsonplaceholder.typicode.com/todos?_limit=10",
  //       {
  //         method: "GET",
  //       }
  //     );
  //     //PEGAR OS DADOS QUE ELA RETORNA
  //     const data = await Response.json();

  //     //ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
  //     setTasks(data);
  //   };
  //   fetchTasks();
  // }, []);

  function onTaskClick(taskid) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskid) {
        //PRECISO ATUALIZAR ESSA TAREFA
        return { ...task, isCompleted: !task.isCompleted };
      }
      //NAO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador De Tarefas
        </h1>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
