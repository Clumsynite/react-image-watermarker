import _ from 'lodash';
import { string, func } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Grid, Image, Message } from 'semantic-ui-react';

import { PlaceholderImage } from '../assets/images';
import { beforeUpload, getBase64 } from '../helper/fucntions';

export default function ImageSelector({ base64, setBase64 }) {
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = async (event) => {
    try {
      const { files } = event.target;
      const file = files[0];
      if (!file) throw new Error('No file selected');
      const imageUri = await getBase64(file);
      setSelectedFile(file);
      setBase64(imageUri);
    } catch (err) {
      const message = _.isString(err)
        ? err
        : err.message || 'Something went wrong';
      setError(message);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (error) {
      timeout = setTimeout(() => {
        setError('');
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  return (
    <>
      {base64 ? (
        <Grid>
          <Grid.Row textAlign="center">
            <Image
              src={base64}
              size="huge"
              label={selectedFile.name}
              centered
            />
          </Grid.Row>
          <Grid.Row verticalAlign="middle" centered>
            <Grid.Column textAlign="center" width={8}>
              <button
                type="button"
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  padding: 8,
                  fontSize: 16,
                  border: '1px solid #e2e3e4',
                  cursor: 'pointer',
                  fontWeight: 'normal',
                  margin: 12,
                }}
                onClick={() => setBase64('')}
              >
                Remove Image
              </button>
            </Grid.Column>
            <Grid.Column textAlign="center" width={8}>
              <UploadButton
                label="Change Image"
                onChange={handleChange}
                onBeforeInput={beforeUpload}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image src={PlaceholderImage} size="large" disabled centered />
          <UploadButton
            label="Select an Image"
            onChange={handleChange}
            onBeforeInput={beforeUpload}
          />
        </div>
      )}
      {error && <Message color="red">{error}</Message>}
    </>
  );
}
ImageSelector.propTypes = {
  base64: string,
  setBase64: func,
};
ImageSelector.defaultProps = {
  base64: '',
  setBase64: () => {},
};

function UploadButton({ label, onChange, onBeforeInput }) {
  return (
    <label
      htmlFor="image-upload"
      style={{
        backgroundColor: '#fff',
        color: '#000',
        padding: 8,
        fontSize: 16,
        border: '1px solid #e2e3e4',
        cursor: 'pointer',
        fontWeight: 'normal',
        margin: 12,
      }}
    >
      <span
        style={{
          padding: '0 5px',
        }}
      >
        {label}
      </span>
      <input
        type="file"
        name="myImage"
        accept="image/png, image/gif, image/jpeg"
        id="image-upload"
        style={{ display: 'none' }}
        onChange={onChange}
        onBeforeInput={onBeforeInput || null}
      />
    </label>
  );
}
UploadButton.propTypes = {
  label: string.isRequired,
  onChange: func.isRequired,
  onBeforeInput: func,
};
UploadButton.defaultProps = {
  onBeforeInput: null,
};
