export interface DialogLine {
    speaker?: string;
    text: string;
    portrait?: string;
}

export interface DialogScript {
    id: string;
    lines: DialogLine[];
    setFlags?: string[];
}
