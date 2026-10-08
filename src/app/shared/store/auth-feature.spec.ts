import '@angular/compiler';

import { beforeEach, describe, expect, it, vi } from 'vitest';

Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
  configurable: true,
});

const { authActions } = await import('./auth-actions');
const { authFeatures, initialAuthState } = await import('./auth-feature');

describe('auth feature reducer', () => {
  it('resets loading state when login fails', () => {
    const state = authFeatures.reducer(
      {
        ...initialAuthState,
        isLoading: true,
        error: null,
      },
      authActions.loginFailure({ error: 'Invalid credentials' }),
    );

    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBe('Invalid credentials');
  });
});
