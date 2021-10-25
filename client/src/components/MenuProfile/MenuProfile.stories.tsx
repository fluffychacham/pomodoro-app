import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MenuProfile } from ".";

export default {
  title: "components/MenuProfile",
  component: MenuProfile,
} as ComponentMeta<typeof MenuProfile>;

const Template: ComponentStory<typeof MenuProfile> = (args) => (
  <MenuProfile {...args} />
);

export const Default = Template.bind({});

Default.args = {
  firstName: "Chester",
  lastName: "Tejido",
  url: "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesarSidePart&accessoriesType=Blank&hairColor=Black&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Blue02&eyeType=Wink&eyebrowType=UnibrowNatural&mouthType=Serious&skinColor=Light",
};

export const EmptyProfile = Template.bind({});

EmptyProfile.args = {};
