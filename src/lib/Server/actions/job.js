"use server";

import { serverMutation } from "@/lib/core/server";

export async function AddJobPost(formData) {
  const result = await serverMutation(`/api/jobs`, formData);

  if (result.modifiedCount > 0) {
    console.log("job posted");
  }
  return result;

  // console.log("API Result:", result);
  // try {
  //   const response = await fetch(`${baseUrl}/api/jobs`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });

  //   return await response.json();
  // } catch (error) {
  //   return { error: "Something went wrong!" };
  // }
}
