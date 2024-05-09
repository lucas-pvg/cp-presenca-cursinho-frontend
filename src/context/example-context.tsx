// THIS IS AN EXAMPLE OF CONTEXT WITH SPECIFIC VALUES

// import { createContext } from "react"

// export type ThemeContextType = "light" | "dark"
// export const ThemeContext = createContext<ThemeContextType>("light")


// THIS IS AN EXAMPLE OF CONTEXT WITH NO DEFAULT VALUE AND A CUSTOM HOOK FOR DEALING WITH NULL VALUES

// import { createContext, useContext } from "react"

// export interface CurrentUserContextType {
//     username: string
// }

// export const CurrentUserContext = createContext<CurrentUserContextType | null>(null)
// export const useCurrentUser = () => {
//     const currentUserContext = useContext(CurrentUserContext)

//     if (!currentUserContext) {
//         throw new Error(
//             "useCurrentUser has to be used within <CurrentUserContext.Provider>"
//         )
//     }

//     return currentUserContext
// }
