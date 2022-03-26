import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Header, Input, Segment,
} from 'semantic-ui-react';
import ImageSelector from '../Components/ImageSelector';

export default function Home() {
  const [base64, setBase64] = useState('');
  const [watermarkText, setWatermarkText] = useState('');
  const [fontSize, setFontSize] = useState(16);

  const onTextChange = (event) => setWatermarkText(event.target.value);

  const changeTextOnImage = (text) => {
    const existingImage = document.getElementsByTagName('img')[0];
    const canvas = document.getElementById('canvas');
    if (existingImage && canvas) {
      const { width, height } = existingImage;
      const newWidth = width * window.devicePixelRatio;
      const newHeight = height * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      canvas.width = newWidth;
      canvas.crossOrigin = 'Anonymous';
      canvas.height = newHeight;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(existingImage, 0, 0, newWidth, newHeight);
      ctx.clearRect(0, 0, newWidth, newHeight);
      ctx.font = `${fontSize}px Verdana`;
      ctx.drawImage(existingImage, 0, 0, newWidth, newHeight);
      ctx.fillStyle = 'white';
      ctx.lineStyle = 'black';
      ctx.fillText(text, 10, 50);
    }
  };

  useEffect(() => {
    if (base64) changeTextOnImage(watermarkText);
  }, [watermarkText, fontSize]);

  const changeImage = (image) => {
    setWatermarkText('');
    setBase64(image);
  };

  const onFontSizeChange = (e) => setFontSize(e.target.value);

  return (
    <Container style={{ padding: '12px 0' }}>
      <Header size="huge" style={{ borderBottom: '1px solid #000009' }}>
        React Image Watermark
      </Header>
      <div />
      <Segment style={{ padding: '12px 0' }}>
        <ImageSelector
          base64={base64}
          setBase64={changeImage}
          watermark={!!watermarkText}
        />
      </Segment>
      {base64 && (
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={8}>
              <Input
                placeholder="WATERMARK"
                size="huge"
                onChange={onTextChange}
                label="Enter text for Watermark: "
                value={watermarkText}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Input
                type="number"
                placeholder="16"
                size="huge"
                onChange={onFontSizeChange}
                label="Enter Watermark Size: "
                value={fontSize}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
}
