jest.useFakeTimers();

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const response = {
  data: [],
};

describe('throttledGetDataFromApi (Оптимальная реализация)', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (axios.create as jest.Mock).mockReturnValue({ data: response });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: response }),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(axiosClient);

    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url after throttling delay', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: response }),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(axiosClient);

    await throttledGetDataFromApi('/posts');
    await jest.advanceTimersByTimeAsync(6000);

    expect(axiosClient.get).toHaveBeenCalledWith('/posts');
  });

  test('should return correct response data', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: response }),
    };

    (axios.create as jest.Mock).mockReturnValueOnce(axiosClient);

    const result = await throttledGetDataFromApi('/posts');

    expect(result).toEqual(response);
  });
});
