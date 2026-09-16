import { Bar, BarChart, Tooltip, XAxis } from 'recharts'
import type { WeeklyChartItem } from '../helper/types'

interface weeklyChartProps{
  data: WeeklyChartItem[]
}

const MarketerSalesPerformanceChart = ({ data }: weeklyChartProps) => {
  return (
    <BarChart
      width={550}
      height={240}
      data={data}
    >
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="2%" stopColor="#305419" stopOpacity={1} />       {/* Top */}
          <stop offset="0%" stopColor="#D2EDC1" stopOpacity={0.6} />   {/* Middle */}
          <stop offset="100%" stopColor="#FBFFF9" stopOpacity={0.6} />  {/* Bottom */}
        </linearGradient>
      </defs>

      <Tooltip trigger="click" content={() => null} cursor={false} shared={false} />

      {/* Use gradient */}
      <Bar
        dataKey="uv"
        stackId="a"
        fill="url(#customGradient)"
        activeBar={{ stroke: 'black', strokeWidth: 7 }}
      />
      <XAxis dataKey="name" niceTicks="snap125" />

      {/* <RechartsDevtools /> */}
    </BarChart>
  )
}

export default MarketerSalesPerformanceChart