import { useEffect, useState } from "react";
import api from "../api/api";
import TaskCard from "../components/TaskCard";

export interface Tasks {
  title: string;
  description: string | null;
  author_id: string;
  id: string;
}

const HomePage = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const getTask = async () => {
    try {
      const res = await api.get("/task");
      setTasks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div>
      {tasks.length != 0 ? (
        <div className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 p-4 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-6 ">
          <h2 className="text-2xl font-bold capitalize">No hay tareas</h2>
        </div>
      )}
    </div>
  );
};
export default HomePage;
