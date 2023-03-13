import React from "react";

import { nativeTheme } from "@electron/remote";

import type { MantineThemeOverride } from "@mantine/core";
import { MantineProvider } from "@mantine/core";

interface Props {
  children: React.ReactNode;
}

const Mantine = ( props: Props ) => {
  const [ colorScheme, setColorScheme ] = React.useState<MantineThemeOverride["colorScheme"]>(() => {
    return nativeTheme.shouldUseDarkColors ? "dark" : "light";
  });

  const theme: MantineThemeOverride = {
    colorScheme,
    loader: "bars",
    fontFamily: "inherit",
    globalStyles: () => ({
      "*, *::before, *::after": {
        boxSizing: "border-box",
        userSelect: "none",
        margin: 0,
        padding: 0,
      },
      "img, svg, a": {
        WebkitUserDrag: "none",
      },
      "body": {
        height: "100vh",
      },
      "#app": {
        all: "inherit",
      },
      "a[href]": {
        color: "inherit",
      },
    }),
  };

  React.useEffect(() => {
    const handleColorSchemeChange = () => {
      return setColorScheme(nativeTheme.shouldUseDarkColors ? "dark" : "light");
    };

    nativeTheme.addListener("updated", handleColorSchemeChange);

    return () => {
      nativeTheme.removeListener("updated", handleColorSchemeChange);
    };
  }, []);

  return (
    <MantineProvider theme={ theme } withGlobalStyles withNormalizeCSS>
      { props.children }
    </MantineProvider>
  );
};

export default Mantine;