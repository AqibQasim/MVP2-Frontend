import { mvp2ApiHelper } from "@/Helpers/mvp2ApiHelper";
import { notFound } from "next/navigation";
// example

const mvp2Url = process.env.NEXT_PUBLIC_API_REMOTE_URL;

export const getProductById = async function (id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    // For testing
    // await new Promise((res) => setTimeout(res, 5000));

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export const getProducts = async function () {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);

    // For testing
    // await new Promise((res) => setTimeout(res, 5000));

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
    // notFound();
    throw new Error(error || "Products could not be loaded");
  }
};

export async function getClientById(id) {
  const payload = {
    endpoint: `client?client_id=${id}`,
    method: "GET",
  };
  const result = await mvp2ApiHelper(payload);
  if (result.status === 200) {
    return result?.data;
  }
  console.error(result?.data?.message);
  notFound();
}

export async function getClientJobs(clientId) {
  const payload = {
    endpoint: `client/job-posting/${clientId}`,
    method: "GET",
  };

  const result = await mvp2ApiHelper(payload);
  if (result.status === 200) {
    return result?.data.result;
  }
  console.error(result?.data?.message);
  return { error: result.data.message };
}

export async function getRecommendedCandidatesOfClient(clientId) {
  const payload = {
    endpoint: `assigned-customer/${clientId}`,
    method: "GET",
  };
  const result = await mvp2ApiHelper(payload);
  if (result.status === 200) {
    return result?.data;
  }
  console.error(result?.data?.message);
  return { error: result.data.message };
}

export async function getClients() {
  const payload = {
    endpoint: "clients",
    method: "GET",
  };

  const result = await mvp2ApiHelper(payload);
  return {
    status: result.status,
    data: result.data,
  };
}

// data-service.js
export async function createJob(jobData) {
  console.log(jobData);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-positions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "An unknown error occurred" };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error.message || "An unknown error occurred" };
  }
}

export async function getJobs() {
  const payload = {
    endpoint: "jobs",
    method: "GET",
  };

  const result = await mvp2ApiHelper(payload);
  if (result?.status === 200) {
    return result?.data?.result;
  }

  throw new Error(result.data.message);
}

// to revalidate a path from client side component
export async function revalidate(path) {
  try {
    const response = await fetch("/api/revalidate-path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    });

    if (response.ok) {
      console.log("Revalidation successful");
    } else {
      console.error("Failed to revalidate");
    }
  } catch (error) {
    console.error("Error during revalidation:", error);
  }
}

export async function fetchCandidates() {
  const payload = {
    endpoint: "customers",
    method: "GET",
  };
  const result = await mvp2ApiHelper(payload);
  if (result?.status === 200) {
    return result?.data;
  }

  throw new Error(result.data.message);
}

export async function fetchClientJobs(client_id) {
  const payload = {
    endpoint: `client/job-posting/${client_id}`,
    method: "GET",
  };
  const result = await mvp2ApiHelper(payload);
  // if (result?.status === 200) {
  //   return result?.data;
  // }
  return {
    status: result.status,
    data: result.data,
  };
}

export async function fetchClientJob(client_id, job_posting_id) {
  const payload = {
    endpoint: `client/job-posting-by-client?job_posting_id=${job_posting_id}&client_id=${client_id}`,
    method: "GET",
  };

  const result = await mvp2ApiHelper(payload);
  console.log("result no condition: ", result);
  if (result.status !== 200) {
    console.log("result failed: ", result);
    console.error(result?.data?.message);
    return { status: result.status, data: null, error: result.data };
  }
  console.log("result success: ", result);
  return { status: result.status, data: result.data.result, error: null };
}

export async function referCandidate(params) {
  const payload = {
    endpoint: `assigned-customer`,
    method: "POST",
    body: params,
  };

  const result = await mvp2ApiHelper(payload);
  console.log("Actual data: ", result?.data?.data);
  if (result.status !== 200) {
    console.error(result?.data?.message);
    return { status: result.status, data: null, error: result.data };
  }
  return { status: result.status, data: result.data.data, error: null };
}

export async function setHourlyRate(params) {
  // expected  body:{customer_id, hourly_rate}
  const payload = {
    endpoint: `set-hourly-rate`,
    method: "PUT",
    body: params,
  };

  const result = await mvp2ApiHelper(payload);
  console.log("Actual data: ", result?.data?.data);
  if (result.status !== 200) {
    console.error(result?.data?.message);
    return { status: result.status, data: null, error: result.data };
  }
  return { status: result.status, data: result.data.result, error: null };
}

export async function candidateUpdateProfile(body, candidateId) {
  const payload = {
    endpoint: `profile-info-update/${candidateId}`,
    method: "PUT",
    body,
  };

  const result = await mvp2ApiHelper(payload);
  if (result.status !== 200) {
    console.error(result?.data?.message);
    return { status: result.status, data: null, error: result.data.message };
  }
  return {
    status: result.status,
    data: result.data.data,
    message: result.data.message,
    error: null,
  };
}

export async function getAllRecommendedCandidates(
  clientId,
  client_response = "all",
) {
  const hired = "accept";
  console.log("client id inside get function: ", clientId);
  console.log("client Response inside get function: ", client_response);
  const payload = {
    endpoint: `get-all-candidates-of-clients-job?client_id=${clientId}`,
    method: "GET",
  };

  const result = await mvp2ApiHelper(payload);
  console.log("Result of get all candidates", result);
  if (result.status !== 200) {
    console.error(result?.data?.message);
    return { error: result.data.message };
  }

  return result?.data.data;
}
