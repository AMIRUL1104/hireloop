"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function AddJobPost(formData) {
  // console.log(formData);

  try {
    const response = await fetch(`${baseUrl}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
