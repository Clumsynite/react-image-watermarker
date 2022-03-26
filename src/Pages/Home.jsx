import React, { useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import ImageSelector from '../Components/ImageSelector';

export default function Home() {
  const [base64, setBase64] = useState('');

  return (
    <Container style={{ padding: '12px 0' }}>
      <Header size="huge" style={{ borderBottom: '1px solid #000009' }}>
        React Image Watermark
      </Header>
      <div>
        <ImageSelector base64={base64} setBase64={setBase64} />
      </div>
    </Container>
  );
}
