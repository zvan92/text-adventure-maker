import { Adventure } from '../types/adventure';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  async getAllAdventures(): Promise<Adventure[]> {
    const response = await fetch(`${API_URL}/api/adventures`);
    if (!response.ok) throw new Error('Failed to fetch adventures');
    return response.json();
  },

  async getAdventure(id: string): Promise<Adventure> {
    const response = await fetch(`${API_URL}/api/adventures/${id}`);
    if (!response.ok) throw new Error('Failed to fetch adventure');
    return response.json();
  },

  async createAdventure(adventure: Adventure): Promise<Adventure> {
    const response = await fetch(`${API_URL}/api/adventures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adventure),
    });
    if (!response.ok) throw new Error('Failed to create adventure');
    return response.json();
  },

  async updateAdventure(id: string, adventure: Adventure): Promise<Adventure> {
    const response = await fetch(`${API_URL}/api/adventures/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adventure),
    });
    if (!response.ok) throw new Error('Failed to update adventure');
    return response.json();
  },

  async deleteAdventure(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/adventures/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete adventure');
  },
}; 