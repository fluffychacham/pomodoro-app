import { SettingsOutlined } from "@material-ui/icons";
import { ComponentStory } from "@storybook/react";
import { IconButton } from ".";

export default {
  title: "components/IconButton",
  component: IconButton,
  argTypes: {
    openOrientation: {
      options: ["right", "left"],
      control: { type: "radio" },
    },
  },
};

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: "Settings",
  icon: <SettingsOutlined />,
  openOrientation: "right",
};
export const LeftOrientation = Template.bind({});

LeftOrientation.args = {
  children: "Settings",
  icon: <SettingsOutlined />,
  openOrientation: "left",
};
