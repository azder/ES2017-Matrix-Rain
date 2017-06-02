((canvas, winscreen, raf) => {

    const width = canvas.width = winscreen.width;
    const height = canvas.height = winscreen.height;
    const context = canvas.getContext('2d');

    //noinspection JSPotentiallyInvalidConstructorUsage
    let points = Array(256).fill('1');

    const paint = (
        () => {
            context.fillStyle = 'rgba(0,0,0,0.05)';
            context.fillRect(0, 0, width, height);
            context.fillStyle = 'rgba(0,255,0,1)';
            points = points.map(
                (value, index) => {
                    const r = Math.random();
                    context.fillText(
                        String.fromCharCode(Math.floor(2720 + r * 33)),
                        index * 10, value,
                    );
                    value += 10;
                    return ( 768 + r * 1e4 < value ) ? 0 : value;
                }
            );
        }
    );

    const delay = 100;
    let before = 0;

    const loop = (
        now => {
            if (delay < now - before) {
                paint();
                before = now;
            }
            raf(loop);
        }
    );

    loop(before);

})(
    document.getElementById('matrix'),
    window.screen,
    window.requestAnimationFrame,
);
