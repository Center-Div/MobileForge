export function validateAppName(input: string): boolean | string {
  const trimmedInput = input.trim();

  // Check for empty input
  if (!trimmedInput) {
    return "App name cannot be empty.";
  }

  // Check for spaces at the start or end
  if (/\s/.test(trimmedInput)) {
    return "App name cannot contain spaces.";
  }

  // Check for special characters (anything that is not alphanumeric)
  const specialCharacterRegex = /[^a-zA-Z0-9]/;
  if (specialCharacterRegex.test(trimmedInput)) {
    return "App name cannot contain special characters.";
  }

  // Check for accented characters
  const accentRegex = /[áàäâãåæçéèëêíìïîóòöôõøúùüûýÿ]/i;
  if (accentRegex.test(trimmedInput)) {
    return "App name cannot contain accented characters.";
  }

  return true;
}
