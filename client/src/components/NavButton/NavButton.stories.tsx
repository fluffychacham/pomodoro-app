import { ComponentStory } from "@storybook/react";
import { NavButton } from ".";

export default {
  title: "components/NavButton",
  component: NavButton,
};

const Template: ComponentStory<typeof NavButton> = (args) => (
  <NavButton {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: "Nav Button",
  isActive: false,
};

export const Active = Template.bind({});

Active.args = {
  children: "Active",
  isActive: true,
};

export const NotActive = Template.bind({});

NotActive.args = {
  children: "Not Active",
  isActive: false,
};
