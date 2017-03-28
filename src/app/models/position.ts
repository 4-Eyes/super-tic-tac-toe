export class BoardLocation {
    x: number;
    y: number;
    sectionLocation: SectionLocation;
}

export class SectionLocation {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
