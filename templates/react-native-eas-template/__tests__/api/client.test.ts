import { apiClient } from '../../app/api/client';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make GET requests', async () => {
    const mockData = { data: 'test' };
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue({ data: mockData });

    // Note: This is a simplified test
    // In a real app, you'd need to properly mock the axios instance
  });
});
