import { createContext } from 'react';

interface TranslationProviderProps {
    children: React.ReactNode
}

// export function getLocale() {
//     // Verifica si el navegador admite la propiedad `navigator.languages`
//     if (navigator.languages && navigator.languages.length > 0) {
//         // El navegador admite múltiples idiomas, devuelve el primer idioma de la lista
//         return navigator.languages[0];
//     } else if (navigator.language) {
//         // El navegador solo admite un idioma, devuelve ese idioma
//         return navigator.language;
//     } else {
//         // No se puede determinar el idioma, devuelve un valor predeterminado
//         return 'en-US'; // O cualquier otro idioma predeterminado que desees
//     }
// }

export const TranslationContext = createContext({
    locale: 'en-US'
})

function TranslationProvider({ children }: TranslationProviderProps) {
    // const locale = getLocale();
    // return (
    //     <TranslationContext.Provider value={{ locale }}>
    //         {children}
    //     </TranslationContext.Provider>
    // )
}

export default TranslationProvider;
