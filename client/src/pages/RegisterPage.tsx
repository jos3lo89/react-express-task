import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import api from "../api/api";
import { useAuthStore } from "../stores/auth.store";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name requerido" }),
  email: z
    .string()
    .min(1, { message: "Email requerido" })
    .email({ message: "Email invalido" }),
  password: z
    .string({ required_error: "Constraseña requerido" })
    .min(6, { message: "La contraseña deber ser mas de 6 caracteres" }),
});

type FormFields = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const login = useAuthStore((set) => set.login);

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    try {
      const res = await api.post("/user/register", values);

      const data = {
        id: res.data.data.id,
        email: res.data.data.email,
        name: res.data.data.name,
      };

      const token = res.data.data.token;

      login(data, token);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-center bg-slate-900 mb-6 py-4">
        <h1 className="text-2xl capitalize font-semibold"> Register</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tu correo electronico
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Lagarto"
            required
          />
          {errors.name && (
            <span className="text-yellow-600 font-light">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tu correo electronico
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
          {errors.email && (
            <span className="text-yellow-600 font-light">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tu contraseña
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors.password && (
            <span className="text-yellow-600 font-light">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
        <div>
          {errors.root && (
            <span className="text-yellow-600 font-light">
              {errors.root.message}
            </span>
          )}
        </div>

        <div className="text-center mt-10">
          <p>
            ¿Ya tienes un cuenta{" "}
            <Link className="text-blue-600 cursor-pointer" to="/login">
              inicia sesión
            </Link>
            ?
          </p>
        </div>
      </form>
    </>
  );
};
export default RegisterPage;
