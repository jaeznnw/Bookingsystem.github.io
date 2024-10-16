import { url } from './configuration';

export const getRoomTypes = async (token) => {
  const response = await fetch(`${url}/typeOfRooms`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const createRoomType = async (body, token) => {
  const response = await fetch(`${url}/typeOfRooms`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const destroyRoomType = async (id, token) => {
  const response = await fetch(`${url}/typeOfRooms/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const updateRoomType = async (body, id, token) => {
  const response = await fetch(`${url}/typeOfRooms/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};
