import * as seedrandom from 'seedrandom';
import { BaseRenderer } from './baseRenderer';
import gsap from 'gsap';
import P5 from 'p5';

const squareSize = 10;

const srandom = seedrandom('b');
const bgOdds = 0.01


let pg
let delta = 0;
let r;
let b;

export default class P5Renderer implements BaseRenderer{

    colors = ['#4EEC6C', '#FFEB34', '#00A7FF', '#FF6100', '#FF0053'];
    backgroundColor = '#FFFFFF';
    items: any = [];

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    maxSize = 10;
    completeCallback: any;
    delta = 0;
    color = this.colors[0];
    animating = true;

    width: number = 1920 / 2;
    height: number = 1080 / 2;

    constructor(w, h) {

        this.width = w;
        this.height = h;

        const sketch = (s) => {
            s.setup = () => this.setup(s)
            s.draw = () => this.draw(s)
        }

        new P5(sketch);

        this.createTimeline();
    }

    protected createTimeline() {

    }

    protected setup(s) {
        let renderer = s.createCanvas(this.width, this.height);
        this.canvas = renderer.canvas;

        pg = s.createGraphics(this.width, this.height, s.WEBGL)


        r = pg.color(66,99,117);
        b = pg.color(186,206,217);
      
        s.pixelDensity(1)
        s.noCursor()
        s.frameRate(60)
      
        s.noStroke()
        s.fill(0, 15)
        
        s.background(98, 145, 168, 255)

        pg.strokeWeight(1)
        //pg.strokeCap(s.PROJECT);
    }

    protected draw(s) {
        if (this.animating) {
            delta += 0.1;
                        
            let x = -this.width / 2;
            let y = -this.height / 2;
            let total = (this.width / squareSize) * ((this.height + squareSize) / squareSize);
          
            for (let i = 0; i < total; i++) {
          
              var c = s.lerpColor(r, b, s.sin(delta + (i * 10)));
              pg.stroke(c)
              pg.fill(98, 145, 168, 100)
              pg.square(x, y, squareSize);
          
              x += squareSize + 1;
              if (x > this.width / 2) {
                x = -this.width / 2;
                y += squareSize + 1;
              }
            }
          
            //if (s.random(0, 1) < bgOdds) pg.background(0)
          
            s.image(pg, 0, 0, s.width, s.height)
        }

    }

    public render() {

    }

    public play() {
        this.animating = true;
        setTimeout(() => {
            if (this.completeCallback) {
                this.completeCallback();
            }
        }, 1000);
    }

    public stop() {
        this.animating = false;
    }

    public setCompleteCallback(completeCallback: any) {
        this.completeCallback = completeCallback;
    }

}