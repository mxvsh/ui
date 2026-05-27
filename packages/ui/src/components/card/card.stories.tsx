import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    tone: {
      control: "select",
      options: ["default", "subtle", "outline", "elevated", "accent"],
    },
  },
  args: {
    tone: "default",
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card className="w-80" {...args}>
      <CardHeader>
        <div>
          <CardTitle>Project usage</CardTitle>
          <CardDescription>Updated just now</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--fg-muted)]">
          Storage is at 68% of the current workspace limit.
        </p>
      </CardContent>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div>
          <CardTitle>Team billing</CardTitle>
          <CardDescription>Next invoice on June 1</CardDescription>
        </div>
        <CardAction>
          <Button tone="outline">
            View
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="rounded-[var(--radius-md)] bg-[var(--bg-subtle)] p-3 text-sm">
          $128.00 estimated for this cycle.
        </div>
      </CardContent>
      <CardFooter>
        <Button tone="ghost">
          Cancel
        </Button>
        <Button tone="primary">
          Upgrade
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Tones: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {(["default", "subtle", "outline", "elevated", "accent"] as const).map((tone) => (
        <Card key={tone} tone={tone}>
          <CardHeader>
            <div>
              <CardTitle className="capitalize">{tone}</CardTitle>
              <CardDescription>Card surface tone</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--fg-muted)]">
              Use this tone to tune emphasis without changing layout.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
