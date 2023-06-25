
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';
import React from 'react';
import { useGetCryptosQuery } from '../Services/cryptoApi';

const { Title } = Typography

function HomePage() {
  const { data, isFetching } = useGetCryptosQuery();
  const globalStats = data?.data?.stats;

  if (isFetching) return 'Loading...';

  return (
    <div>
      <Title level={2} className='heading'>Global Crypto States</Title>
      <Row>
        <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStats} /></Col>
        <Col span={12}><Statistic title='Total Exchanges' value='5' /></Col>
        <Col span={12}><Statistic title=' Total Market gap' value='5' /></Col>
        <Col span={12}><Statistic title='Total Markets' value='5' /></Col>
        <Col span={12}><Statistic title='Total 24h Volume' value='5' /></Col>
      </Row>
    </div>
  )
}

export default HomePage
