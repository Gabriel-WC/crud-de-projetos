const firebaseErrorMap = {
  'auth/email-already-in-use': 'Este email ja esta em uso.',
  'auth/invalid-credential': 'Email ou senha invalidos.',
  'auth/invalid-email': 'Informe um email valido.',
  'auth/missing-password': 'Informe a senha.',
  'auth/network-request-failed': 'Falha de rede. Verifique sua conexao e tente novamente.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente em instantes.',
  'auth/user-not-found': 'Usuario nao encontrado.',
  'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
  'permission-denied': 'Voce nao tem permissao para executar esta acao.',
  'unavailable': 'Servico temporariamente indisponivel. Tente novamente.',
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
