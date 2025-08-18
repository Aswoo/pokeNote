// src/components/Header.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { ThemeProvider } from "@/shared/lib/ThemeContext";
import "@/app/globals.css"; // Tailwind 글로벌

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    // Next.js Link가 Storybook에서 작동하도록 설정
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LightTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="light">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Header component in light theme mode",
      },
    },
  },
};

export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="dark">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Header component in dark theme mode",
      },
    },
  },
};

export const WithContent: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Story />
          <main className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Sample Content
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              This story shows how the header looks with content below it. You
              can test the theme toggle button to see the color changes.
            </p>
          </main>
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Header with sample content below to demonstrate the full layout and theme switching functionality",
      },
    },
  },
};

export const Interactive: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="min-h-screen transition-colors duration-300">
          <Story />
          <div className="p-8 space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Interactive Demo
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Click the theme toggle button in the header to see the colors
                change throughout the page.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Card 1
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This content adapts to theme changes
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Card 2
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Theme transitions are smooth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive header with content that demonstrates theme switching functionality",
      },
    },
  },
};
