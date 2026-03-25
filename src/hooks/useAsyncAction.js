import { useState } from 'react';
import { getFirebaseErrorMessage } from '../utils/getFirebaseErrorMessage';

export function useAsyncAction(action) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const execute = async (...args) => {
    setLoading(true);
    setError('');

    try {
      return await action(...args);
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    loading,
    error,
    clearError: () => setError(''),
  };
}
