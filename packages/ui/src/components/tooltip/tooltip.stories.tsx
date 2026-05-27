import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../button/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={150}>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button tone="ghost">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Some helpful context</TooltipContent>
    </Tooltip>
  ),
}
