
function main() {
    const ctx = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d')!;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 10000, 1000);
    ctx.fill();
    
    ctx.font = '36px serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Hello world', 20, 50);
}

