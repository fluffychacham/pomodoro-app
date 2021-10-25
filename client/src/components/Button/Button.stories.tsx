import { ComponentStory } from "@storybook/react";
import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: "Primary",
  color: "primary",
  size: "md",
};

export const Danger = Template.bind({});

Danger.args = {
  children: "Danger",
  color: "danger",
  size: "md",
};

export const Small = Template.bind({});

Small.args = {
  children: "Small",
  color: "primary",
  size: "sm",
};

export const Medium = Template.bind({});

Medium.args = {
  children: "Medium",
  color: "primary",
  size: "md",
};

export const Large = Template.bind({});

Large.args = {
  children: "Large",
  color: "primary",
  size: "lg",
};
