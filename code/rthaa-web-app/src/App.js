import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./global/Dashboard"

const App = () => {

    const [theme, colorMode] = useMode()

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <div className="app">
                        <Dashboard />
                </div>

            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App