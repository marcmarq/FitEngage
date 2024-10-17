import { CalendarOutlined } from '@ant-design/icons'
import { Badge, Card, List } from 'antd'
import { Text } from '../text'
import GymUpdatesSkeleton from '../skeleton/skeleton/upcoming-events'
import { DASHBOARD_CALENDAR_GYM_UPDATES_QUERY } from '@/graphql/queries'
import { useList } from '@refinedev/core'
import { getDate } from '@/utilities/helpers'
import dayjs from 'dayjs'

const GymUpdates = () => {
  const {data, isLoading} = useList({
    resource: 'events',
    pagination: { pageSize: 5},
    sorters: [
      {
        field: 'startDate',
        order: 'asc'
      }
    ],
    filters: [
      {
        field: 'startDate',
        operator: 'gte',
        value: dayjs().format('YYYY-MM_DD')
      }
    ],
    meta: {
      gqlQuery: DASHBOARD_CALENDAR_GYM_UPDATES_QUERY
    }
  });

  return (
    <Card
      style ={{ height: '100%'}}
      styles={{
        header: { padding: '8px 16px' },  
        body: { padding: '0 1rem' }       
      }}
      title={
        <div
          style = {{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CalendarOutlined />
          <Text size="sm" style={{marginLeft: "0.7rem"}}>
            Gym Updates
          </Text>
        </div>
      }>
        {isLoading ? (
          <List
            itemLayout="horizontal"
            dataSource={Array.from({length: 5}).map((_, index) => ({
            id: index,
            }))}
            renderItem={() => <GymUpdatesSkeleton />}
            >
          </List>
        ): (
          <List
            itemLayout='horizontal'
            dataSource={ data?.data || []}
            renderItem={(item) => {
              const renderDate = getDate(item.startDate, item.endDate)

              return(
                <List.Item>
                  <List.Item.Meta 
                    avatar={<Badge color = {item.color} />}
                    title={<Text size="xs"></Text>}
                    description={<Text ellipsis={{ tooltip: true }} 
                    strong >
                      {item.title}
                    </Text>}
                  />
                </List.Item>
              )
            }}
          />
        )}

        {!isLoading && data?.data.length === 0 && (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '220px'
            }}
          >
            No Gym Updates
          </span>
        )}
    </Card>
  )
}

export default GymUpdates

