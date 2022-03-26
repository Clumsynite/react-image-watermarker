import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Header, Input, Segment,
} from 'semantic-ui-react';
import ImageSelector from '../Components/ImageSelector';
import { isHexValid } from '../helper/functions';

export default function Home() {
  const [base64, setBase64] = useState('');
  const [watermarkText, setWatermarkText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [hexColor, setHexColor] = useState('fff');

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
      const color = `#${hexColor}`;
      ctx.fillStyle = isHexValid(color) ? color : '#fff';
      ctx.fillText(text, 10, 50);

      // ctx.strokeStyle = '#000';
      // ctx.strokeText(text, 10, 50);
    }
  };

  useEffect(() => {
    if (base64) changeTextOnImage(watermarkText);
  }, [watermarkText, fontSize, hexColor]);

  const changeImage = (image) => {
    setWatermarkText('');
    setBase64(image);
  };

  const onFontSizeChange = (e) => setFontSize(e.target.value);

  const onHexColorChange = (e) => setHexColor(e.target.value);

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
          <Grid.Row centered verticalAlign="middle">
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
          <Grid.Row centered verticalAlign="middle">
            <Grid.Column width={8}>
              <Input
                type="text"
                placeholder="fff"
                size="huge"
                onChange={onHexColorChange}
                label="Enter Font color (HEX): "
                input={(
                  <input
                    style={{
                      borderColor: isHexValid(`#${hexColor}`)
                        ? `#${hexColor}`
                        : '#000',
                    }}
                  />
                )}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <span />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
}
