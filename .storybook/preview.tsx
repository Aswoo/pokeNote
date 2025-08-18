// .storybook/preview.tsx
import React from "react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/shared/lib/ThemeContext";

initialize();

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
  mswDecorator,
];

export const parameters: Preview["parameters"] = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
