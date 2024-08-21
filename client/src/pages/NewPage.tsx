import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const taskSchema = z.object({
  title: z.string().min(1, { message: "titulo requerido" }),
  description: z.string(),
});

export type FormFields = z.infer<typeof taskSchema>;

const NewPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(taskSchema),
  });

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      if (params.id) {
        const res = await api.put(`/task/update/${params.id}`, values);

        console.log(res);

        navigate("/");


      } else {
        const res = await api.post("/task/create", values);
        console.log(res);
        reset();
        navigate("/");
        toast.success("Tarea creada", {
          description: "la tarea fue creada con exito",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (params.id) {
        const res = await api.get(`/task/get-id/${params.id}`);
        console.log(res);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      }
    };

    loadData();
  }, []);

  const handleDeleteTask = async (id: string) => {
    try {
      const res = await api.delete(`/task/delete/${id}`);
      console.log(res);
      navigate("/");
      
      toast.success("Tarea borrada", {
        description: "la tarea fue borrada con exito",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {params.id && (
        <div className="flex justify-end mt-4 mx-auto max-w-[400px]">
          <button
            onClick={() => handleDeleteTask(params.id!)}
            className="bg-red-600 px-2 py1 rounded-lg hover:bg-red-500"
          >
            Borrar
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-6">
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Titulo
          </label>
          <input
            {...register("title")}
            autoFocus
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripción
          </label>
          <textarea
            {...register("description")}
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write description..."
          ></textarea>
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {params.id ? "Actulaizar  " : "Guardar"}
        </button>

        {errors.root && <span>{errors.root.message}</span>}
      </form>
    </>
  );
};
export default NewPage;
