import Mob  from "../events/mob"
import { RpgMap } from "@rpgjs/server";
import SAT from "sat";

// Translating value of spawn property
// from Tiled editor to actual NPC class
export const NPC = {
    'mob': Mob,
}

// Your tile size
const TILE_SIZE = [32, 32];


export class Spawn {
    shapes: any[];
    map: RpgMap;


    constructor(shapes: Object[], map: RpgMap) {
        this.shapes = shapes;
        this.map = map;
    }


    // Generate event
    generate = (name: string, x, y) => {
        if (!NPC[name]) return;
        this.map.createDynamicEvent({
            x,
            y,
            event: NPC[name]
        });
        return NPC[name];
    }


    // Get random number from range
    random = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    // Get middle of the tile to which X & Y belong
    getTileMiddle = (data: { x: number, y: number }) => {
        const tile = this.map.getTileOriginPosition(data.x, data.y);
        const { x, y } = tile;

        return {
            x: x + (TILE_SIZE[0] / 2),
            y: y + (TILE_SIZE[1] / 2)
        };
    }


    // Check if point belongs to polygon and has no collision
    isValid = (polygon: SAT.polygon, x: number, y: number) => {
        const tile = this.map.getTileByPosition(x, y);
        if (tile.hasCollision) return false;

        const point = new SAT.Vector(x, y);
        if (!SAT.pointInPolygon(point, polygon)) return false;

        return true;
    }


    // Populate all spawns with NPCs
    populate = () => {
        const spawns = this.getSpawnsFromShapes();
        spawns.forEach(spawn => {

            const box = spawn.polygon.getAABBAsBox();
            const startX = spawn.polygon.pos.x, startY = spawn.polygon.pos.y;
            const endX = startX + box.w, endY = startY + box.h;
            const { npc, quantity } = spawn;

            for (let i = 0; i < quantity;) {
                const { x, y } = this.getTileMiddle({
                    x: this.random(startX, endX),
                    y: this.random(startY, endY)
                });

                if (!this.isValid(spawn.polygon, x, y)) continue;

                this.generate(npc, x, y); i++;
            }

        });
    }


    // Transform shapes to SAT.Polygon
    getSpawnsFromShapes = () => {
        const spawns: any[] = [];
        this.shapes.forEach(shape => {
            if (shape.properties?.spawn && shape.hitbox?.points) {
                const { pos, points } = shape.hitbox;
                const polygon = new SAT.Polygon(new SAT.Vector(pos.x, pos.y), points);
                const { quantity, spawn } = shape.properties;
                spawns.push({ polygon, npc: spawn, quantity });
            }
        });
        return spawns;
    }
} 