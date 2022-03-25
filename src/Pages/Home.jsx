import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export default function Home() {
  return (
    <Container style={{ padding: '12px 0' }}>
      <Header size="huge" style={{ borderBottom: '1px solid #000009' }}>
        React Image Watermark
      </Header>
    </Container>
  );
}
