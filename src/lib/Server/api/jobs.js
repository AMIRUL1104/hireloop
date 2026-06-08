const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function getCompanyJobPosts(companyId, status = "active") {
  const response = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`,
  );
  return await response.json();
}
