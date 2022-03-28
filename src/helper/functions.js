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

const downloadBase64AsImage = (dataURL, fileName = 'image.png') => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataURL;
  link.click();
};

const getFilenameAndExtension = (file) => {
  const filename = file.name.split('.');
  const extension = filename[filename.length - 1];
  return {
    filename: filename.slice(0, filename.length - 1).join('.'),
    extension,
  };
};

export {
  getBase64,
  beforeUpload,
  isHexValid,
  downloadBase64AsImage,
  getFilenameAndExtension,
};
