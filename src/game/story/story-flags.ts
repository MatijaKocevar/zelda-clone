const storyFlags = new Set<string>();

export function hasFlag(flag: string): boolean {
    return storyFlags.has(flag);
}

export function hasAllFlags(flags?: string[]): boolean {
    return !flags?.length || flags.every((flag) => storyFlags.has(flag));
}

export function hasAnyFlag(flags?: string[]): boolean {
    return Boolean(flags?.length && flags.some((flag) => storyFlags.has(flag)));
}

export function passesFlagConditions(requiredFlags?: string[], forbiddenFlags?: string[]): boolean {
    return hasAllFlags(requiredFlags) && !hasAnyFlag(forbiddenFlags);
}

export function setFlag(flag: string): void {
    storyFlags.add(flag);
}

export function setFlags(flags?: string[]): void {
    flags?.forEach(setFlag);
}

export function getStoryFlags(): string[] {
    return [...storyFlags];
}

export function setStoryFlags(flags: string[]): void {
    storyFlags.clear();
    flags.forEach((flag) => storyFlags.add(flag));
}

export function resetStoryFlags(): void {
    storyFlags.clear();
}
