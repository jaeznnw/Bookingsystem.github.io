import { url } from "./configuration";

export const indexbooking = async (token) => {
  const response = await fetch(`${url}/booking`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const storebooking = async (body, token) => {
  const response = await fetch(`${url}/booking`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const destroybooking = async (id, token) => {
  const response = await fetch(`${url}/booking/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const updatebooking = async (body, id, token) => {
  const response = await fetch(`${url}/booking/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};
