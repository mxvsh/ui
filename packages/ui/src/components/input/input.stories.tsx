import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: { placeholder: "Type something…" },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true, value: "Disabled" } }
export const Invalid: Story = { args: { invalid: true, defaultValue: "Wrong value" } }
export const WithLabel: Story = {
  render: () => (
    <label className="flex w-64 flex-col gap-1.5 text-sm">
      <span className="text-[var(--fg-muted)]">Email</span>
      <Input type="email" placeholder="you@example.com" />
    </label>
  ),
}
