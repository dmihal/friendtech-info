"use client"
import { AccountTimeData } from '@/api';
import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';


export const ChartComponent = ({ data, colors = {} }: { data: AccountTimeData[], colors?: any }) => {
	const {
		backgroundColor = 'white',
		lineColor = '#2962FF',
		textColor = 'black',
		areaTopColor = '#2962FF',
		areaBottomColor = 'rgba(41, 98, 255, 0.28)',
	} = colors;

	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(
		() => {
			if (!chartContainerRef.current) return

			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();

			const priceSeries = chart.addCandlestickSeries();
      priceSeries.priceScale().applyOptions({
        scaleMargins: {
          // positioning the price scale for the area series
          top: 0.1,
          bottom: 0.4,
        },
      });
			priceSeries.setData(data);

      const volumeSeries = chart.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '', // set as an overlay by setting a blank priceScaleId
        // set the positioning of the volume series
      });
      volumeSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.7, // highest point of the series will be 70% away from the top
          bottom: 0,
        },
      });
      volumeSeries.setData(data.map((item: any) => ({ time: item.time, value: item.volume })));

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	)
}
