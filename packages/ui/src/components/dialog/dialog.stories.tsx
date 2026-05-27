import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../button/button"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button tone="primary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>
            This action can't be undone. The project and its history will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-[var(--fg-muted)]">
            Type the project name to confirm — or just close this dialog.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <Button tone="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
