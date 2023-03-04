import {Liquid, measureTextWidth} from '@antv/g2plot';

/**
 * 水波图
 * @param {string} id   指定容器ID
 * @param {number} data 传入数据
 * @param {number} radius  水波图半径
 * @param {string} name 水波图名称
 */
export function waterWaveDiagram(id, data, radius, name) {

    const liquidPlot = new Liquid(document.getElementById(id), {
        percent: data,
        radius: radius,
        outline: {
            border: 4,
            distance: 4,
        },
        statistic: {
            title: {
                formatter: () => name,
                style: ({percent}) => ({
                    fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
                }),
            },
            content: {
                style: ({percent}) => ({
                    fontSize: 50,
                    lineHeight: 1,
                    fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
                }),
                customHtml: (container, view, {percent}) => {
                    const {width, height} = container.getBoundingClientRect();
                    const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                    const text = `占比 ${(percent * 100).toFixed(0)}%`;
                    const textWidth = measureTextWidth(text, {fontSize: 60});
                    const scale = Math.min(d / textWidth, 1);
                    return `<div style="width:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${
                        scale <= 1 ? 1 : 'inherit'
                    }">${text}</div>`;
                },
            },
        },
        liquidStyle: ({percent}) => {
            return {
                fill: percent > 0.89 ? 'rgba(255,2,2,0.87)' : (percent > 0.78 ? 'rgba(243,231,8,0.99)' : '#5B8FF9'),
                stroke: percent > 0.89 ? 'rgba(255,2,2,0.87)' : (percent > 0.78 ? 'rgba(243,231,8,0.99)' : '#5B8FF9'),
            };
        },
        color: () => '#5B8FF9',
    });
    liquidPlot.render();

    // let data = 0.25;
    // const interval = setInterval(() => {
    //     data += Math.min(Math.random() * 0.1, 0.1);
    //     if (data < 0.75) {
    //         liquidPlot.changeData(data);
    //     } else {
    //         clearInterval(interval);
    //     }
    // }, 500);
    return liquidPlot;
}
