const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getReqruiterCompanies(recruiterId) {
  const response = await fetch(
    `${baseUrl}/api/my/companies?recruiterId=${recruiterId}`,
  );

  return await response.json();
}
