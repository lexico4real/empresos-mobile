/**
 * Generates initials from a full name
 * @param name The full name to generate initials from
 * @returns Uppercase initials of the name
 * @example
 * getInitials("John Doe") // "JD"
 * getInitials("Mary Jane Smith") // "MJS"
 */
export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

/**
 * Generates a consistent color based on a name
 * @param name The name to generate a color for
 * @returns A hex color code
 * @example
 * getColorFromName("John Doe") // "#4A90E2"
 */
export const getColorFromName = (name: string) => {
  const colors = [
    "#4A90E2", // Blue
    "#F5A623", // Orange
    "#50E3C2", // Teal
    "#BD10E0", // Purple
    "#7ED321", // Green
    "#D0021B", // Red
  ];
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};
