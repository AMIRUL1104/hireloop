const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export async function getCompanyJobPosts(companyId, status = "active") {
//   const response = await fetch(
//     `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`,
//   );
//   return await response.json();
// }
export async function getReqruiterPostedJObs(recruiterId, status = "active") {
  const response = await fetch(
    `${baseUrl}/api/jobs?recruiterId=${recruiterId}&status=${status}`,
  );
  return await response.json();
}
// http://localhost:4000/api/jobs?recruiterId=6a283c84c45eddac77ea81e2&status=active
