export class BoardLocation {
    x: number;
    y: number;
    sectionLocation: SectionLocation;

    constructor(upperX: number, upperY: number, innerX: number, innerY) {
        this.x = upperX;
        this.y = upperY;
        this.sectionLocation = new SectionLocation(innerX, innerY);
    }
}

export class SectionLocation {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
