export class BoardLocation {
    x: number;
    y: number;
    sectionLocation: SectionLocation;

    constructor(upperX: number, upperY: number, innerPosition?: SectionLocation, innerX?: number, innerY?: number) {
        this.x = upperX;
        this.y = upperY;
        if (innerPosition) {
            this.sectionLocation = innerPosition;
        }
        else if (innerX && innerY) {
        this.sectionLocation = new SectionLocation(innerX, innerY);
        }
    }

    sameUpperAndInner(): boolean {
        return this.x === this.sectionLocation.x && this.y === this.sectionLocation.y;
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
