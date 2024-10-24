import { DashboardTotalCard, GymRevenue, GymUpdates } from "@/components";
import DashboardTotalCountCard from "@/components/home/total-cards-count";
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries";
import { DashboardTotalCountsQuery } from "@/graphql/types";
import { useCustom } from "@refinedev/core";
import { Col, Row } from "antd";

export const Home = () => {

  const {data, isLoading} = useCustom<DashboardTotalCountsQuery>({
    url: '/api/graphql',
    method: 'get',
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY
    }
  })

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard 
            resource="companies"
            isLoading={isLoading}
            totalCount={data?.data.companies.totalCount ?? 0}
            />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard 
            resource="contacts"
            isLoading={isLoading}
              totalCount={data?.data.contacts.totalCount?? 0}
            />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard 
            resource="deals"
            isLoading={isLoading}
            totalCount={data?.data.deals.totalCount?? 0}
            />
        </Col>
      </Row>

      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: "460",
          }}
        >
          <GymUpdates />
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: "460",
          }}
        >
          <GymRevenue />
        </Col>
      </Row>
    </div>
  );
};
