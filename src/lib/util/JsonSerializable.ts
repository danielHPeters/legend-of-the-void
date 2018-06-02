/**
 * Interface for classes intended to be serializable to JSON.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface JsonSerializable {
  /**
   * Convert object to JSON string.
   *
   * @returns The generated json string.
   */
  toJSON (): string

  /**
   * Initialize object from JSON string.
   *
   * @param json The json string
   */
  fromJSON (json: string): void
}
