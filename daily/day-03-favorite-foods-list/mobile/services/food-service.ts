import { apiClient, ApiError, NetworkError } from './api-client';

export interface Food {
  id: number;
  name: string;
  photo: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFoodRequest {
  name: string;
  photo?: string;
}

export interface UpdateFoodRequest {
  name?: string;
  photo?: string;
}

/**
 * Food Service
 * Handles all API calls related to favorite foods
 */
class FoodService {
  private readonly endpoint = '/api/foods';

  /**
   * Get all favorite foods
   */
  async getAllFoods(): Promise<Food[]> {
    try {
      const response = await apiClient.get<{ foods: Food[] }>(this.endpoint);
      return response.foods || [];
    } catch (error) {
      if (error instanceof NetworkError) {
        console.error('Network error fetching foods:', error.message);
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      if (error instanceof ApiError) {
        console.error('API error fetching foods:', error.message);
        throw new Error('Failed to load your favorite foods. Please try again.');
      }
      throw error;
    }
  }

  /**
   * Get a single food by ID
   */
  async getFoodById(id: number): Promise<Food> {
    try {
      const response = await apiClient.get<{ food: Food }>(`${this.endpoint}/${id}`);
      return response.food;
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) {
        throw new Error('Food not found');
      }
      if (error instanceof NetworkError) {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw new Error('Failed to load food details. Please try again.');
    }
  }

  /**
   * Create a new favorite food
   */
  async createFood(data: CreateFoodRequest): Promise<Food> {
    try {
      const response = await apiClient.post<{ food: Food }>(this.endpoint, data);
      return response.food;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 400) {
          throw new Error('Invalid food data. Please check your input.');
        }
        if (error.statusCode === 409) {
          throw new Error('This food already exists in your favorites.');
        }
      }
      if (error instanceof NetworkError) {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw new Error('Failed to add food to favorites. Please try again.');
    }
  }

  /**
   * Update an existing food
   */
  async updateFood(id: number, data: UpdateFoodRequest): Promise<Food> {
    try {
      const response = await apiClient.put<{ food: Food }>(`${this.endpoint}/${id}`, data);
      return response.food;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 404) {
          throw new Error('Food not found');
        }
        if (error.statusCode === 400) {
          throw new Error('Invalid food data. Please check your input.');
        }
      }
      if (error instanceof NetworkError) {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw new Error('Failed to update food. Please try again.');
    }
  }

  /**
   * Delete a food from favorites
   */
  async deleteFood(id: number): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 404) {
        // Silently succeed if already deleted
        return;
      }
      if (error instanceof NetworkError) {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw new Error('Failed to delete food. Please try again.');
    }
  }
}

// Export singleton instance
export const foodService = new FoodService();
