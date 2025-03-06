export function getTheme(color: string) {
  switch (color) {
    case "red": {
      return {
        colorPrimary: "#f22524",
        colorPrimaryLight: "#f56663",
      };
    }
    case "orange": {
      return {
        colorPrimary: "#ff4b00",
        colorPrimaryLight: "#ff814d",
      };
    }
    case "yellow": {
      return {
        colorPrimary: "#cc9800",
        colorPrimaryLight: "#ffbf00",
      };
    }
    case "green": {
      return {
        colorPrimary: "#00743e",
        colorPrimaryLight: "#4c9d77",
      };
    }
    case "blue": {
      return {
        colorPrimary: "#01a3e1",
        colorPrimaryLight: "#30c5fe",
      };
    }
    case "purple": {
      return {
        colorPrimary: "#5325c0",
        colorPrimaryLight: "#8666d2",
      };
    }
    case "black": {
      return {
        colorPrimary: "#000000",
        colorPrimaryLight: "#333333",
      };
    }
    default: {
      return {
        colorPrimary: "#000000",
        colorPrimaryLight: "#333333",
      };
    }
  }
}
