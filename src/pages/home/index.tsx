import { GymRevenue, GymUpdates } from "@/components"
import { Col, Row } from "antd"

export const Home = () => {
    return (
        <div>
            <Row
              gutter ={[32, 32]}
              style ={{
                marginTop: '32px'
              }}
            >
             <Col
              xs = {24}
              sm = {24}
              xl= {8}
              style={{
                height: '460'
              }}>
               <GymUpdates />
            </Col>
             <Col
              xs = {24}
              sm = {24}
              xl= {8}
              style={{
                height: '460'
              }}>
               <GymRevenue />
            </Col>
            </Row>
        </div>
    )
}

