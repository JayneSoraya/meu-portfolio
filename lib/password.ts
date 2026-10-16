export function isPasswordStrong(password: string): boolean {
  // a. Mínimo de 8 caracteres
  const minLength = password.length >= 8;
  // b. Mínimo de 2 números
  const hasTwoNumbers = (password.match(/\d/g) || []).length >= 2;
  // c. Mínimo de 1 caractere especial (!@#$%^&*(),.?":{}|<>)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\-_=+\\\/\[\]]/.test(password);
  // d. Mínimo de 1 letra maiúscula
  const hasUpperCase = /[A-Z]/.test(password);
  // e. Mínimo de 1 letra minúscula
  const hasLowerCase = /[a-z]/.test(password);

  return minLength && hasTwoNumbers && hasSpecialChar && hasUpperCase && hasLowerCase;
}