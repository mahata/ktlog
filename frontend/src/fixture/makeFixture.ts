export const makeFixture = <T>(defaults: T, overrides?: Partial<T>) => {
  return { ...defaults, ...overrides }
}
