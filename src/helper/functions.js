function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    throw new Error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    throw new Error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const isHexValid = (hex) => {
  const regex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
  return regex.test(hex);
};

export { getBase64, beforeUpload, isHexValid };
