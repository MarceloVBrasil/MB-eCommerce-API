function validateProvince(province: string): boolean {
    return ['AB', 'BC', 'MB', 'NB', 'NF', 'NS', 'NT', 'NU', 'PE', 'ON', 'QC', 'SK', 'YT'].includes(province)
}

export { validateProvince }