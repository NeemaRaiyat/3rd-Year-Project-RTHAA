import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Colour Design Tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },     // Grey
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#434957",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509",
            },     // Blue
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922",
            },     // Green
            redAccent: {
                100: "#f9dcdb",
                200: "#f2b9b7",
                300: "#ec9592",
                400: "#e5726e",
                500: "#df4f4a",
                600: "#b23f3b",
                700: "#862f2c",
                800: "#59201e",
                900: "#2d100f",
            },     // Red
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632",
            },     // Blue
        } : {    
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },     // Grey
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#e4dede",
                500: "#141b2d",
                600: "#434957",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },     // Blue
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#3da58a",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },     // Green
            redAccent: {
                100: "#2d100f",
                200: "#59201e",
                300: "#862f2c",
                400: "#b23f3b",
                500: "#df4f4a",
                600: "#e5726e",
                700: "#ec9592",
                800: "#f2b9b7",
                900: "#f9dcdb",
            },     // Red
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
            },
        }
    )
})

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode)

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.primary[500]
                    },
                    alt: {
                        dark: "#B754B8",
                        main: "#cb74cc",
                        light: "#E49EE5"
                    },
                    alt2: {
                        dark: colors.greenAccent[700],
                        main: colors.greenAccent[500],
                        light: colors.greenAccent[200],
                    },
                    alt3: {
                        dark: "#3a6bc9",
                        main: "#4f81e3",
                        light: "#7aa4f5",
                    },
                    alt4: {
                        light: "#37dba7",
                        main: colors.greenAccent[600],
                        dark: "#238264",
                    },
                    err: {
                        light: "#fa6d52",
                        main: "#db2300",
                        dark: "#b51d00",
                    },
                    alt5: {
                        light: "#f5b169",
                        main: "#c2792d",
                        dark: "#945716",
                    }
                }
                :
                {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc"
                    },
                    alt: {
                        dark: "#B754B8",
                        main: "#E98FEA",
                        light: "#E49EE5"
                    },
                    alt2: {
                        dark: colors.greenAccent[400],
                        main: "#4cceac",
                        light: colors.greenAccent[700],
                    },
                    alt3: {
                        dark: "#2681A8",
                        main: "#25B5F3",
                        light: "#5CC2EE",
                    },
                    alt4: {
                        light: "#37dba7",
                        main: "#35c497",
                        dark: "#238264"
                    },
                    err: {
                        light: "#ff8793",
                        main: "#ff5768",
                        dark: "#d63848",
                    },
                    alt5: {
                        light: "#f5b169",
                        main: "#e3913b",
                        dark: "#945716",
                    },
                }
            )
        }, 
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 26,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
            hx1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 28,
            },
            hx2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 22,
            },
        },
    }
}

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
            setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};