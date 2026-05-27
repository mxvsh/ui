import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}

export const Checked: Story = { args: { defaultChecked: true } }

export const Indeterminate: Story = { args: { indeterminate: true } }

export const Disabled: Story = { args: { disabled: true } }

export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } }

export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
      <Checkbox id="terms" />
      <span className="text-[var(--fg)]">Accept terms and conditions</span>
    </label>
  ),
}
