import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Dropdown,
  Grid,
  Header,
  Input,
  Segment,
} from 'semantic-ui-react';
import ImageSelector from '../Components/ImageSelector';
import { isHexValid } from '../helper/functions';

export default function Home() {
  const [base64, setBase64] = useState('');
  const [watermarkText, setWatermarkText] = useState('');
  const [fontSize, setFontSize] = useState(40);
  const [hexColor, setHexColor] = useState('fff');
  const [horizontalPosition, setHorizontalPosition] = useState('center');
  const [verticalPosition, setVerticalPosition] = useState('center');
  const [currentAngle, setCurrentAngle] = useState(0);

  const horizontalPositions = ['center', 'left', 'right'];
  const verticalPositions = ['center', 'top', 'bottom'];
  const angleRotation = 45;

  const getCoordinates = (position, width, height) => {
    switch (position) {
      case 'center':
        return {
          top: height / 2,
          left: width / 2,
        };
      case 'left':
        return {
          top: height / 2,
          left: width / 4,
        };
      case 'right':
        return {
          top: height / 2,
          left: (width / 4) * 3,
        };
      case 'top':
        return {
          top: height / 4,
          left: width / 2,
        };
      case 'bottom':
        return {
          top: (height / 4) * 3,
          left: width / 2,
        };
      default:
        return {
          top: height / 2,
          left: width / 2,
        };
    }
  };

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

      ctx.drawImage(existingImage, 0, 0, newWidth, newHeight);
      ctx.clearRect(0, 0, newWidth, newHeight);
      ctx.font = `${fontSize}px Verdana`;
      ctx.drawImage(existingImage, 0, 0, newWidth, newHeight);
      const color = `#${hexColor}`;
      ctx.fillStyle = isHexValid(color) ? color : '#fff';

      const { left } = getCoordinates(horizontalPosition, width, height);
      const { top } = getCoordinates(verticalPosition, width, height);

      const x = left;
      const y = top;

      const radians = currentAngle * (Math.PI / 180);

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.translate(x, y);
      ctx.rotate(radians);
      ctx.fillText(text, 0, 0);
      ctx.restore();

      // ctx.strokeStyle = '#000';
      // ctx.strokeText(text, 10, 50);
    }
  };

  useEffect(() => {
    if (base64) changeTextOnImage(watermarkText);
  }, [
    watermarkText,
    fontSize,
    hexColor,
    horizontalPosition,
    verticalPosition,
    currentAngle,
  ]);

  const resetValues = () => {
    setWatermarkText('');
    setFontSize(40);
    setHexColor('fff');
    setHorizontalPosition('center');
    setVerticalPosition('center');
    setCurrentAngle(0);
  };

  const changeImage = (image) => {
    resetValues();
    setBase64(image);
  };

  const onTextChange = (event) => setWatermarkText(event.target.value);

  const onFontSizeChange = (e) => setFontSize(e.target.value);

  const onHexColorChange = (e) => setHexColor(e.target.value);

  const onHorizontalPositionChange = (e, { value }) => setHorizontalPosition(value);

  const onVerticalPositionChange = (e, { value }) => setVerticalPosition(value);

  const onRotateLeft = () => setCurrentAngle(currentAngle - angleRotation);

  const onRotateRight = () => setCurrentAngle(currentAngle + angleRotation);

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
              <Grid.Row centered verticalAlign="middle">
                <Dropdown
                  text="Hotizontal Watermark Position"
                  floating
                  labeled
                  button
                  onChange={onHorizontalPositionChange}
                  value={horizontalPosition}
                  className="icon"
                >
                  <Dropdown.Menu>
                    {_.map(horizontalPositions, (pos, i) => (
                      <Dropdown.Item
                        value={pos}
                        key={`${i}_${pos}_${_.uniqueId('id')}`}
                        onClick={onHorizontalPositionChange}
                      >
                        {_.capitalize(pos)}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                  text="Vertical Watermark Position"
                  floating
                  labeled
                  button
                  onChange={onVerticalPositionChange}
                  value={horizontalPosition}
                  className="icon"
                >
                  <Dropdown.Menu>
                    {_.map(verticalPositions, (pos, i) => (
                      <Dropdown.Item
                        value={pos}
                        key={`${i}_${pos}_${_.uniqueId('id')}`}
                        onClick={onVerticalPositionChange}
                      >
                        {_.capitalize(pos)}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered verticalAlign="middle">
            <Grid.Column width={8}>
              <span />
            </Grid.Column>
            <Grid.Column width={8}>
              <Button.Group>
                <Button
                  icon="undo"
                  content="Rotate Watermark Left"
                  labelPosition="left"
                  onClick={onRotateLeft}
                />
                <Button.Or />
                <Button
                  icon="redo"
                  content="Rotate Watermark Right"
                  labelPosition="right"
                  onClick={onRotateRight}
                />
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
}
