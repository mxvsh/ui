import type { Preview } from "@storybook/react-vite"
import "./preview.css"

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "mxv-bg",
      values: [
        { name: "mxv-bg", value: "oklch(0.985 0.004 80)" },
        { name: "mxv-bg-dark", value: "oklch(0.18 0.01 260)" },
      ],
    },
    layout: "centered",
  },
}

export default preview
