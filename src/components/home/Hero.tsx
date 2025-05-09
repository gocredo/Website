'use client';
import { useForm } from "react-hook-form";

type FormData = { name: string; email: string; message: string };

export function Hero() {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <input {...register("name")} className="w-full p-2 mb-4 border" placeholder="Name" />
      <input {...register("email")} className="w-full p-2 mb-4 border" placeholder="Email" />
      <textarea {...register("message")} className="w-full p-2 mb-4 border" placeholder="Message" />
      {/* <Button type="submit">Submit</Button> */}
    </form>
  );
}