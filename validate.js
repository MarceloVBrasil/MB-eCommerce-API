export function validateEmail(email) {
  if (!email.includes("@") || !email.includes(".")) return false;

  const [username, domainExtension] = email.split("@");
  if (!username || !domainExtension) return false;

  const [domain, extension] = domainExtension.split(".");
  if (!domain || !extension) return false;

  return true;
}

export function validatePostalCode(postalCode) {
  if (postalCode.length < 6 || postalCode.length > 7) return false;
  if (postalCode.length === 7 && !validSeparateCharacter(postalCode[3]))
    return false;
  if (!evenDigitsAreLetters(postalCode)) return false;
  if (!oddDigitsAreNumbers(postalCode)) return false;
  return true;
}

function validSeparateCharacter(c) {
  return c === " " || c === "-";
}

function evenDigitsAreLetters(str) {
  const chars = str.split("").filter((c) => c !== " " && c !== "-");
  for (let i = 0; i < 6; i += 2) {
    if (!isLetter(chars[i])) return false;
  }
  return true;
}

function oddDigitsAreNumbers(str) {
  const chars = str.split("").filter((c) => c !== " " && c !== "-");
  for (let i = 0; i < 6; i += 2) {
    if (!isNaN(chars[i])) return false;
  }
  return true;
}

function isLetter(c) {
  return c.toLowerCase() !== c.toUpperCase();
}
