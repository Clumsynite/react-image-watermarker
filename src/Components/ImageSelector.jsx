import _ from 'lodash';
import { string, func } from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Dimmer, Image, Loader, Message, Segment,
} from 'semantic-ui-react';

import { PlaceholderImage } from '../assets/images';
import { beforeUpload, getBase64 } from '../helper/fucntions';

export default function ImageSelector({ base64, setBase64 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = async (event) => {
    try {
      const { files } = event.target;
      const file = files[0];
      if (!file) throw new Error('No file selected');
      setIsLoading(true);
      const imageUri = await getBase64(file);
      setIsLoading(false);
      setSelectedFile(file);
      setBase64(imageUri);
    } catch (err) {
      setIsLoading(false);
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
    <Segment>
      <Dimmer active={isLoading} inverted>
        <Loader size="mini">Loading</Loader>
      </Dimmer>

      {base64 ? (
        <Image src={base64} size="medium" centered label={selectedFile.name} />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image src={PlaceholderImage} size="medium" disabled centered />
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
              Select an Image
            </span>
            <input
              type="file"
              name="myImage"
              accept="image/png, image/gif, image/jpeg"
              id="image-upload"
              style={{ display: 'none' }}
              onChange={handleChange}
              onBeforeInput={beforeUpload}
            />
          </label>
        </div>
      )}
      {error && <Message color="red">{error}</Message>}
    </Segment>
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
