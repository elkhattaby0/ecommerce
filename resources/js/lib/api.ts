import axios from 'axios';

export async function fetchJson<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);

    return response.data;
}

export async function postJson<T>(url: string, payload: Record<string, unknown>): Promise<T> {
    const response = await axios.post<T>(url, payload);

    return response.data;
}

export async function patchJson<T>(url: string, payload: Record<string, unknown> = {}): Promise<T> {
    const response = await axios.patch<T>(url, payload);

    return response.data;
}

export async function deleteJson<T>(url: string): Promise<T> {
    const response = await axios.delete<T>(url);

    return response.data;
}
