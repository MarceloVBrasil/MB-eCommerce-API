function getTodaysDate() {
    const date = new Date(Date.now())
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export { getTodaysDate }