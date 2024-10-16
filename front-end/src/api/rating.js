import { url } from "./configuration";

export const indexRating = async (token) => {
  const response = await fetch(`${url}/ratings`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server returned an error:", errorText);
    throw new Error("Failed to fetch ratings");
  }

  return await response.json();
};

export const storeRating = async (body, token) => {
  const response = await fetch(`${url}/ratings`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server returned an error:", errorText);
    throw new Error("Failed to store rating");
  }

  return await response.json();
};

export const destroyRating = async (id, token) => {
  const response = await fetch(`${url}/ratings/${id}?_method=DELETE`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server returned an error:", errorText);
    throw new Error("Failed to delete rating");
  }

  return await response.json();
};

export const updateRating = async (body, id, token) => {
  const response = await fetch(`${url}/ratings/${id}?_method=PATCH`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server returned an error:", errorText);
    throw new Error("Failed to update rating");
  }

  return await response.json();
};

export const fetchRatings = async (roomId) => {
  const response = await fetch(`${url}/ratings?roomId=${roomId}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server returned an error:", errorText);
    throw new Error("Failed to fetch ratings");
  }
  return response.json();
};
