import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MenuDrawer } from ".";
import { Timer, FormatListBulleted, ExitToApp } from "@material-ui/icons";
import { MenuProfile } from "../MenuProfile";

export default {
  title: "components/MenuDrawer",
  component: MenuDrawer,
  argTypes: {
    toggle: {
      action: "Close Menu",
    },
  },
} as ComponentMeta<typeof MenuDrawer>;

const Template: ComponentStory<typeof MenuDrawer> = (args) => (
  <MenuDrawer {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: (
    <MenuProfile
      firstName="Chester"
      lastName="Tejido"
      url={
        "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesarSidePart&accessoriesType=Blank&hairColor=Black&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Blue02&eyeType=Wink&eyebrowType=UnibrowNatural&mouthType=Serious&skinColor=Light"
      }
    />
  ),
  isOpen: false,
  items: [
    <div>
      <Timer /> Pomodoro
    </div>,
    <div>
      <FormatListBulleted /> Task List
    </div>,
  ],

  bottomItems: [
    <div>
      <ExitToApp /> Sign Out
    </div>,
  ],
};
