import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import QuizGame from "./QuizGame";

const meta: Meta<typeof QuizGame> = {
  title: "Widgets/QuizGame",
  component: QuizGame,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuizGame>;

// Mocking the PokeAPI call
const pikachuMock = {
  name: "pikachu",
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
  types: [{ type: { name: "electric" } }],
};

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://pokeapi.co/api/v2/pokemon/:id", () => {
          return HttpResponse.json(pikachuMock);
        }),
      ],
    },
  },
};
