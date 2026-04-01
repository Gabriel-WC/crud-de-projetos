const firebaseErrorMap = {
  'auth/email-already-in-use': 'Este email já está em uso.',
  'auth/invalid-credential': 'Email ou senha inválidos.',
  'auth/invalid-email': 'Informe um email válido.',
  'auth/missing-password': 'Informe a senha.',
  'auth/network-request-failed': 'Falha de rede. Verifique sua conexão e tente novamente.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente em instantes.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
  'permission-denied': 'Você não tem permissão para executar esta ação.',
  unavailable: 'Serviço temporariamente indisponível. Tente novamente.',
};

export function getFirebaseErrorMessage(error) {
  if (!error) {
    return 'Ocorreu um erro inesperado.';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error.code && firebaseErrorMap[error.code]) {
    return firebaseErrorMap[error.code];
  }

  if (error.message) {
    return error.message;
  }

  return 'Ocorreu um erro inesperado.';
}
