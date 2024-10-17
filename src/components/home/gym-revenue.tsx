import { DollarOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import { Area, AreaConfig } from '@ant-design/plots'
import { useList } from '@refinedev/core'
import { DASHBOARD_GYM_REVENUE_QUERY } from '@/graphql/queries'
import { mapDealsData } from '@/utilities/helpers'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { DashboardGymRevenueQuery } from '@/graphql/types'

const GymRevenue = () => {
    const { data } = useList<GetFieldsFromList<DashboardGymRevenueQuery>>({
        resource: 'dealStages',
        // filters: [
        //     {
        //         field: 'title', operator: 'in', value: ['NEW MEMBER', 'REMOVED MEMBER']
        //     }
        // ],
        meta: {
            gqlQuery: DASHBOARD_GYM_REVENUE_QUERY
        }
    });

    const dealData = React.useMemo(() => {
        return mapDealsData(data?.data)
    }, [data?.data] )

     const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    isStack: false,
    seriesField:'state',
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
        offsetY: -6
    },
    yAxis: {
        tickCount: 4,
        label: {
            formatter: (v: string) => {
                return `$${Number(v) /1000}k`
            }
        }
    },
    tooltip: {
        formatter: (data) => {
            return {
                name: data.state,
                value: `$${Number(data.value) /1000}k`
            }
        }
    },
  }

  return (
    <Card
      style ={{ height: '100%'}}
      styles={{
        header: { padding: '8px 16px' },  
        body: { padding: '24px 24px 0px 24px' }       
    }}
    title={
        <div>
            <DollarOutlined />
            <Text size="sm" style={{marginLeft: '0.5rem'}}>
                Revenue
            </Text>
        </div>
    }
    >
        <Area {...config} height={325}/>
    </Card>
  )
}

export default GymRevenue
