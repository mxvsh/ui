import type { Meta, StoryObj } from "@storybook/react-vite"
import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}

export const Checked: Story = { args: { defaultChecked: true } }

export const Disabled: Story = { args: { disabled: true } }

export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } }

export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
      <Switch id="notifications" />
      <span className="text-[var(--fg)]">Enable notifications</span>
    </label>
  ),
}
