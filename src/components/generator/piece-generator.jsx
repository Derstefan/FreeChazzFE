import { Component } from 'react'
import RandomGenerator from './random-generator';
import UtilFunctions from './util-functions';
import { Bodies } from 'matter-js';

class PieceGenerator {

    constructor(width, height, seedstr) {
        this.gen = new RandomGenerator(seedstr);
        this.width = width;
        this.height = height;
        this.canvas2 = document.createElement('canvas');
        this.c2 = this.canvas2.getContext('2d');
        this.canvas2.width = width;
        this.canvas2.height = height;
        this.matterBodies = [];


        this.owner = "P1";
        this.lvl = 5;
    }




    randomColor() {
        var r, g, b;
        if (this.owner === "P1") {
            r = Math.floor(this.gen.random() * 165 + 65).toString(16);
            g = Math.floor(this.gen.random() * 165 + 65).toString(16);
            b = Math.floor(this.gen.random() * 165 + 65).toString(16);
            return "#" + r + g + b;
        }
        r = Math.floor(this.gen.random() * 165 + 10).toString(16);
        g = Math.floor(this.gen.random() * 165 + 10).toString(16);
        b = Math.floor(this.gen.random() * 165 + 10).toString(16);
        return "#" + r + g + b;
    }

    randomPoints(num) {
        var points = [];
        for (var i = 0; i < num; i++) {
            var x = this.gen.randNumOfRange(0, this.width);
            var y = this.gen.randNumOfRange(0, this.height);
            points.push({ x: x, y: y });
        }
        // TODO: check if some area is there
        // let area = UtilFunctions.polygonArea(points);
        // if (area < 4) {
        //     console.log(points);
        //     points = this.randomPoints(num);
        // }
        return points;
    }



    drawShape(points) {
        var shape = new Path2D();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                shape.moveTo(points[i].x, points[i].y);
            } else {
                shape.lineTo(points[i].x, points[i].y);
            }
        }

        return shape;
    }

    drawMirrorShape(points) {
        var shape = new Path2D();
        for (var i = 0; i < points.length; i++) {
            var x = this.width - points[i].x;
            if (i === 0) {
                shape.moveTo(x, points[i].y);
            } else {
                shape.lineTo(x, points[i].y);
            }
        }
        return shape;
    }

    drawCurvedShape(points) {

        var shape = new Path2D();
        for (var i = 0; i < points.length; i++) {
            if (i === 0) {
                shape.moveTo(points[i].x, points[i].y);
            } else if (i % 2 === 0) {
                shape.quadraticCurveTo(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y)
            }
        }
        return shape;
    }

    drawCurvedMirrorShape(points) {
        var shape = new Path2D();
        for (var i = 0; i < points.length; i++) {
            var x = this.width - points[i].x;
            if (i === 0) {
                shape.moveTo(x, points[i].y);
            } else if (i % 2 === 0) {
                var x1 = this.width - points[i - 1].x;
                var x2 = this.width - points[i].x;
                shape.quadraticCurveTo(x1, points[i - 1].y, x2, points[i].y)
            }
        }
        return shape;
    }


    // ----------------------------------------------------------------------------------------------------------------

    drawCurvedMirroredPolygon() {

        var pointNumber = this.gen.randNumOfRange(3, this.mapPolygonMaxSize(this.lvl).number);
        var points = this.randomPoints(pointNumber);
        //console.log(UtilFunctions.polygonArea(points));
        var color = this.randomColor();

        this.c2.fillStyle = color;
        this.c2.fill(this.drawCurvedShape(points));
        this.c2.fillStyle = color;
        this.c2.fill(this.drawCurvedMirrorShape(points));
    }

    drawMirroredPolygon() {

        var pointNumber = this.gen.randNumOfRange(3, this.mapPolygonMaxSize(this.lvl).number);
        var points = this.randomPoints(pointNumber);
        while (UtilFunctions.polygonArea(points) < 6.0) {
            points = this.randomPoints(pointNumber);
        }

        var color = this.randomColor();


        this.c2.fillStyle = color;
        this.c2.fill(this.drawShape(points));
        this.c2.fillStyle = color;
        this.c2.fill(this.drawMirrorShape(points));



        this.addBodies(points, color);
        var points2 = points;
        points2.forEach(p => { p.x = this.width - p.x; });
        this.addBodies(points2, color);
    }

    drawCurvedMirroredPolygonColorDiff() {

        var pointNumber = this.gen.randNumOfRange(3, this.mapPolygonMaxSize(this.lvl).number);
        var points = this.randomPoints(pointNumber);
        var color = this.randomColor();
        var color2 = this.randomColor();

        this.c2.fillStyle = color;
        this.c2.fill(this.drawCurvedShape(points));
        this.c2.fillStyle = color2;
        this.c2.fill(this.drawCurvedMirrorShape(points));
    }

    drawMirroredPolygonColorDiff() {

        var pointNumber = this.gen.randNumOfRange(3, this.mapPolygonMaxSize(this.lvl).number);
        var points = this.randomPoints(pointNumber);
        var color = this.randomColor();
        var color2 = this.randomColor();

        this.c2.fillStyle = color;
        this.c2.fill(this.drawShape(points));
        this.c2.fillStyle = color2;
        this.c2.fill(this.drawMirrorShape(points));

        this.addBodies(points, color);
        var points2 = points;
        points2.forEach(p => { p.x = this.width - p.x; });
        this.addBodies(points2, color2);
    }

    //sort points in y direction
    sortPoints(points) {
        return points.sort((a, b) => (a.y > b.y) ? 1 : -1);
    }

    addBodies(points, color) {
        var pointList = this.sortPoints(points);
        for (var i = 2; i < pointList.length; i++) {
            var body = Bodies.fromVertices(0, 0, [points[i - 2], points[i - 1], points[i]]);
            if (body.vertices.length >= 3) {
                body.torque = 0.05;
                this.matterBodies.push({ body: body, color: color, alpha: 1.0 });
            }

        }

    }


    drawPolygons(num) {
        return [...Array(num).keys()].map(() => this.gen.random() > 0.05 ? this.drawMirroredPolygon() : this.drawMirroredPolygonColorDiff());
    }


    getMatterBodies() {
        this.drawPolygons(this.gen.randNumOfRange(3, this.mapPolygonMaxSize(this.lvl).corner))
        return this.matterBodies;
    }

    drawPieceCanvas(owner, lvl) {
        this.owner = owner;
        this.lvl = lvl;
        ; this.drawPolygons(this.gen.randNumOfRange(3, this.mapPolygonMaxSize(lvl).corner))


        return (
            this.canvas2
        );
    }


    mapPolygonMaxSize(lvl) {
        switch (lvl) {
            case 1:
                return { corner: 6, number: 3 };
            case 2:
                return { corner: 6, number: 3 };
            case 3:
                return { corner: 6, number: 4 };
            case 4:
                return { corner: 8, number: 4 };
            case 5:
                return { corner: 10, number: 5 };
            default:
                return { corner: 5, number: 3 };
        }
    }


}

export default PieceGenerator