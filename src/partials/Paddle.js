import {
    SVG_NS
} from '../settings';
export default class Paddle {
    constructor(boardHeight, width, height, x, y) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;
    }
    render(svg) {

        let rect1 = document.createElementNS(SVG_NS, 'rect');
        rect1.setAttributeNS(null, 'width', 8);
        rect1.setAttributeNS(null, 'height', 56);
        rect1.setAttributeNS(null, 'x', 10);
        rect1.setAttributeNS(null, 'y', 100);
        rect1.setAttributeNS(null, 'fill', '#fff');
        svg.appendChild(rect1);

        let rect2 = document.createElementNS(SVG_NS, 'rect');
        rect2.setAttributeNS(null, 'width', 8);
        rect2.setAttributeNS(null, 'height', 56);
        rect2.setAttributeNS(null, 'x', 494);
        rect2.setAttributeNS(null, 'y', 100);
        rect2.setAttributeNS(null, 'fill', '#fff');
        svg.appendChild(rect2);

    }
}