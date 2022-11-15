export const excerpt=(str,count) => {
    if((str || '').length >count){
        str = str.substring(0,count) + "..."

    }
    // return str.toLowerCase()
    return str
}

export const excerptLower=(str,count) => {
    if((str || '').length >count){
        str = str?.substring(0,count) + "..."
        
    }
    return str.toLowerCase()
}