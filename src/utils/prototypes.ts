declare global {
  interface String {
    capitalize(): string;
    obfuscateEmail(): string;
  }
}

// eslint-disable-next-line
String.prototype.capitalize = function (): string {
  if (this.length === 0) {
    return this.toString();
  }
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

// eslint-disable-next-line
String.prototype.obfuscateEmail = function (): string {
  const email = this as string;
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  // Split the email into username and domain
  const [username, domain] = this.split('@');

  // Get the first two characters of the username
  const firstTwoChars = username.slice(0, 2);

  // Construct the obfuscated email
  const obfuscatedEmail = `${firstTwoChars}******@${domain}`;

  return obfuscatedEmail;
};

export {};
