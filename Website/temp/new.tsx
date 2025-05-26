"use client";

import { useAuth } from "@clerk/nextjs";

const callBackend = async () => {
  const { getToken } = useAuth();

  const token = await getToken({ template: "goCredo1" });

//   const res = await fetch("/api/protected", {
//     method: "GET",
//     headers: {
//       Authorization: Bearer ${token},
//     },
//   });

//   const data = await res.json();
//   console.log(data);
console.log(token);
};
callBackend();