export interface Task {
  title: string;
  description: string | null;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3>{task.title}</h3>
      <p>{task.description ?? "No tiene descripcion"}</p>
    </div>
  );
};

export default TaskCard;
