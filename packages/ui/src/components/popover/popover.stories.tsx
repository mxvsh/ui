import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../button/button"
import { Input } from "../input/input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button tone="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-2">
        <p className="text-sm font-medium">Quick edit</p>
        <Input placeholder="New name" />
      </PopoverContent>
    </Popover>
  ),
}
