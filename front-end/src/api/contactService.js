import { url } from './configuration';

export const sendContactMessage = async (body, token) => {
    const response = await fetch(`${url}/contact`, {
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
