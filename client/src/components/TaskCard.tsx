import { Link } from "react-router-dom";

export interface Task {
  title: string;
  description: string | null;
  id: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Link to={`/update/${task.id}`}>
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3>{task.title}</h3>
        <p>{task.description ?? "No tiene descripcion"}</p>
      </div>
    </Link>
  );
};

export default TaskCard;
