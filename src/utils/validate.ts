import { getFileExtension } from "./getFileExtension"

function isEmailValid(email: string) {
  if (!email.includes("@") || !email.includes(".")) return false;

  const [username, domainExtension] = email.split("@");
  if (!username || !domainExtension) return false;

  const [domain, extension] = domainExtension.split(".");
  if (!domain || !extension) return false;

  return true;
}

function isPostalCodeValid(postalCode: string) {
  if (!postalCode) return false
  if (postalCode.length < 6 || postalCode.length > 7) return false;
  if (postalCode.length === 7 && !validSeparateCharacter(postalCode[3]))
    return false;
  if (!evenDigitsAreLetters(postalCode)) return false;
  if (!oddDigitsAreNumbers(postalCode)) return false;
  return true;
}

function validSeparateCharacter(c: string) {
  return c === " " || c === "-";
}

function evenDigitsAreLetters(str: string) {
  const chars = str.split("").filter((c) => c !== " " && c !== "-");
  for (let i = 0; i < 6; i += 2) {
    if (!isLetter(chars[i])) return false;
  }
  return true;
}

function oddDigitsAreNumbers(str: string) {
  const chars = str.split("").filter((c) => c !== " " && c !== "-");
  for (let i = 0; i < 6; i += 2) {
    if (!isNaN(parseInt(chars[i]))) return false;
  }
  return true;
}

function isLetter(c: string) {
  return c.toLowerCase() !== c.toUpperCase();
}

function isProvinceValid(province: string) {
  const validProvinces = ["AB", "BC", "MB", "NB", "NL", "NT", "NS", "NU", "ON", "PE", "QC", "SK", "YT"]
  return validProvinces.includes(province)
}

function isFileValid(filename: string) {
  const acceptedFormats = ["png", "jpg", "jpeg", "webp"]
  const extension = getFileExtension(filename)
  return acceptedFormats.includes(extension)
}

export { isEmailValid, isPostalCodeValid, isProvinceValid, isFileValid }