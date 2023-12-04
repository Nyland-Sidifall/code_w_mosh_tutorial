"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useSession, signOut } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

export const AccountSettings = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, update } = useSession();
  const userId = session?.user?.id;

  const router = useRouter();
  const updateNotify = () => {
    toast.success("You're Password's Successfuly Updated🎉", {
      autoClose: 7000,
    });
    setTimeout(() => {}, 7000);
  };

  const deleteNotify = () => {
    toast.success("You're Account Has Been Deleted👋🏾", {
      autoClose: 7000,
    });
    setTimeout(() => {
      router.push("/");
    }, 7000);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        const updatedSession = {
          ...session,
          user: {
            ...session?.user,
            id: updatedUser.user.id,
          },
        };
        await update(updatedSession);
        updateNotify();
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        deleteNotify();
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
          className=" p-4 my-4 rounded-xl border-pink-300 border-4"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className=" p-4 rounded-xl border-pink-300 border-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className=" p-4 my-4 rounded-xl border-pink-300 border-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className=" p-4 mt-4 bg-green-500 rounded-xl  space-x-2"
        >
          Change Password
        </button>
      </form>

      <button
        type="submit"
        className=" p-4 mt-4 bg-red-500 rounded-xl  space-x-2"
        onClick={handleDelete}
      >
        Delete Account
      </button>
      <ToastContainer />
    </div>
  );
};

export default AccountSettings;
