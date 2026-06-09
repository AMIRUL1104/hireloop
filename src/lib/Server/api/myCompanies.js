const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getReqruiterCompanies(reqruiterId) {
  const response = await fetch(
    `${baseUrl}/api/my/companies?reqruiterId=${reqruiterId}`,
  );

  return await response.json();
}
