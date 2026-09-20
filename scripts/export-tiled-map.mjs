#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

function readAttributes(tag) {
    const attributes = {};

    for (const match of tag.matchAll(/([\w:-]+)="([^"]*)"/g)) {
        attributes[match[1]] = match[2];
    }

    return attributes;
}

function readTileset(tsxPath, firstgid) {
    const tsx = readFileSync(tsxPath, 'utf8');
    const tileset = readAttributes(tsx.match(/<tileset\b[^>]*>/)[0]);
    const image = readAttributes(tsx.match(/<image\b[^>]*\/>/)[0]);

    return {
        type: 'tileset',
        version: tileset.version,
        tiledversion: tileset.tiledversion,
        firstgid: Number(firstgid),
        name: tileset.name,
        tilewidth: Number(tileset.tilewidth),
        tileheight: Number(tileset.tileheight),
        spacing: Number(tileset.spacing ?? 0),
        margin: Number(tileset.margin ?? 0),
        tilecount: Number(tileset.tilecount ?? 0),
        columns: Number(tileset.columns ?? 0),
        image: image.source,
        imagewidth: Number(image.width),
        imageheight: Number(image.height),
    };
}

function readLayer(tag, body) {
    const layer = readAttributes(tag);
    const csv = body.match(/<data\b[^>]*>([\s\S]*?)<\/data>/)?.[1] ?? '';

    return {
        type: 'tilelayer',
        id: Number(layer.id),
        name: layer.name,
        x: 0,
        y: 0,
        width: Number(layer.width),
        height: Number(layer.height),
        visible: layer.visible !== '0',
        opacity: Number(layer.opacity ?? 1),
        data: csv
            .split(',')
            .map((value) => Number(value.trim()))
            .filter((value) => !Number.isNaN(value)),
    };
}

function readObjectLayer(tag, body) {
    const layer = readAttributes(tag);

    const objects = [...body.matchAll(/<object\b([^>]*?)\/?>/g)].map(([, objectTag]) => {
        const object = readAttributes(objectTag);

        return {
            id: Number(object.id),
            name: object.name ?? '',
            type: object.type ?? '',
            x: Number(object.x ?? 0),
            y: Number(object.y ?? 0),
            width: Number(object.width ?? 0),
            height: Number(object.height ?? 0),
            rotation: Number(object.rotation ?? 0),
            visible: object.visible !== '0',
        };
    });

    return {
        type: 'objectgroup',
        id: Number(layer.id),
        name: layer.name,
        x: 0,
        y: 0,
        visible: layer.visible !== '0',
        opacity: Number(layer.opacity ?? 1),
        objects,
    };
}

function convertTmxToTmj(tmxPath) {
    const xml = readFileSync(tmxPath, 'utf8');
    const map = readAttributes(xml.match(/<map\b[^>]*>/)[0]);
    const mapDir = dirname(tmxPath);

    const tilesets = [...xml.matchAll(/<tileset\b[^>]*\/>/g)].map(([tag]) => {
        const { firstgid, source } = readAttributes(tag);
        return readTileset(join(mapDir, source), firstgid);
    });

    const layers = [
        ...[...xml.matchAll(/<layer\b([^>]*)>([\s\S]*?)<\/layer>/g)].map(([, tag, body]) => readLayer(tag, body)),
        ...[...xml.matchAll(/<objectgroup\b([^>]*)>([\s\S]*?)<\/objectgroup>/g)].map(([, tag, body]) =>
            readObjectLayer(tag, body),
        ),
    ].sort((a, b) => a.id - b.id);

    return {
        compressionlevel: -1,
        type: 'map',
        version: map.version,
        tiledversion: map.tiledversion,
        orientation: map.orientation ?? 'orthogonal',
        renderorder: map.renderorder ?? 'right-down',
        infinite: map.infinite === '1',
        width: Number(map.width),
        height: Number(map.height),
        tilewidth: Number(map.tilewidth),
        tileheight: Number(map.tileheight),
        nextlayerid: Number(map.nextlayerid ?? 0),
        nextobjectid: Number(map.nextobjectid ?? 0),
        layers,
        tilesets,
    };
}

const [input, output] = process.argv.slice(2);

if (!input) {
    console.error('Usage: node scripts/export-tiled-map.mjs <map.tmx> [output.tmj]');
    process.exit(1);
}

const outputPath = output ?? resolve(input).replace(/\.tmx$/i, '.tmj');
const map = convertTmxToTmj(input);

writeFileSync(outputPath, JSON.stringify(map, null, 2));
console.log(`Wrote ${outputPath}`);
