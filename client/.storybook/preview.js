export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'navy-blue',
    values: [
      {
        name: 'navy-blue',
        value: "#414066" // dark navy blue, primary color
      },
      {
        name: 'white',
        value: "#fffdfd" // white
      },

    ]
  }
}