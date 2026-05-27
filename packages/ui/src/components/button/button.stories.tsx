import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    tone: {
      control: "select",
      options: ["default", "primary", "ghost", "outline", "danger", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "icon-sm", "icon", "icon-lg"],
    },
  },
  args: {
    children: "Button",
    tone: "default",
    size: "md",
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}
export const Primary: Story = { args: { tone: "primary" } }
export const Ghost: Story = { args: { tone: "ghost" } }
export const Outline: Story = { args: { tone: "outline" } }
export const Danger: Story = { args: { tone: "danger" } }
export const Link: Story = { args: { tone: "link" } }

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Default</Button>
      <Button tone="primary">Primary</Button>
      <Button tone="ghost">Ghost</Button>
      <Button tone="outline">Outline</Button>
      <Button tone="danger">Danger</Button>
      <Button tone="link">Link</Button>
    </div>
  ),
}
