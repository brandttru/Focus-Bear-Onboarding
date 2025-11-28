import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchUser } from '../src/userSlice';

describe('Async thunk: fetchUser', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('successfully fetches user data and updates state', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 1, name: 'John Doe' }),
      }),
    );

    const store = configureStore({
      reducer: {
        user: userReducer,
      },
    });

    await store.dispatch(fetchUser(1));

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.data).toEqual({ id: 1, name: 'John Doe' });
    expect(state.error).toBeNull();
  });

  it('handles fetch errors gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    const store = configureStore({
      reducer: {
        user: userReducer,
      },
    });

    await store.dispatch(fetchUser(1));

    const state = store.getState().user;

    expect(state.loading).toBe(false);
    expect(state.data).toBeNull();
    expect(state.error).toBe('Network error');
  });
});
