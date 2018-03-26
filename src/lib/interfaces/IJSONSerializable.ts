export default interface IJSONSerializable {
  toJSON (): string
  fromJSON (json: string): void
}
