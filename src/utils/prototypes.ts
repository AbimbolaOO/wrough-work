declare global {
  interface String {
    capitalize(): string;
    obfuscateEmail(): string;
  }

  interface Number {
    formatCurrency(): string;
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
    // throw new Error('Invalid email format');
    return email;
  }

  // Split the email into username and domain
  const [username, domain] = this.split('@');

  // Get the first two characters of the username
  const firstTwoChars = username.slice(0, 2);

  // Construct the obfuscated email
  const obfuscatedEmail = `${firstTwoChars}******@${domain}`;

  return obfuscatedEmail;
};

/* eslint-disable no-extend-native */
Number.prototype.formatCurrency = function (): string {
  const amount = Number(this);
  if (isNaN(amount)) {
    return "--";
  }

  return this.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export {};
