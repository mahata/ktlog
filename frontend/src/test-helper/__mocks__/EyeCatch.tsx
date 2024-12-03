import type { EyeCatch } from "@/component/EyeCatch/EyeCatch"
import type { ComponentProps } from "react"

const testDoubles = {
  eyeCatchSpy: vi.fn(),
}

const EyeCatchMock = (props: ComponentProps<typeof EyeCatch>) => {
  testDoubles.eyeCatchSpy(props)
  return <div data-testid="EyeCatch" />
}

export { testDoubles as _EyeCatch, EyeCatchMock as EyeCatch }
