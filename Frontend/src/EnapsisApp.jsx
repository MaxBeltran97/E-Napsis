import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const EnapsisApp = () => {
    return (
        <AppTheme>
            <AppRouter />
        </AppTheme>
    )
}
