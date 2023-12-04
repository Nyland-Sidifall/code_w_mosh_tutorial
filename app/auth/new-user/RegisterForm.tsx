"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const notify = () => {
    toast.success("You're Successfully Registered 🎉", { autoClose: 7000 });
    setTimeout(() => {
      router.push("/");
    }, 7000);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      if (res.ok) {
        notify();
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        className=" flex justify-center items-center flex-col"
        onSubmit={onSubmit}
      >
        <input
          className=" p-4 my-4 rounded-xl border-red-300 border-4"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className=" p-4 rounded-xl border-red-300 border-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className=" p-4 my-4 rounded-xl border-red-300 border-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className=" p-4 mt-4 bg-slate-500 rounded-xl  space-x-2"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
