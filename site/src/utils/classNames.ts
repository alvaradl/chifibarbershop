/**
 * Utility function to conditionally join class names.
 * Filters out falsy values and joins the remaining strings with spaces.
 * @param parts - Class name parts to join.
 * @returns A space-separated string of valid class names.
 */
export function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}
