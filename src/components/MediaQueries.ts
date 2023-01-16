export const ScreenMaxWidth = (maxWidth: number, css: string) => {
    return `
    @media screen and (max-width: ${maxWidth}px) {
        ${css}
    }
    `
}

export const ScreenMinWidth = (minWidth: number, css: string) => {
    return `
    @media screen and (min-width: ${minWidth}px) {
        ${css}
    }
    ` 
}