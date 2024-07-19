
const convertDataToBinary = (data) => {
  return data.reduce((acc, byte) => acc + byte.toString(2).padStart(8, '0'), '');
};

const mapBinaryToColors = (binaryString) => {
  const colorMap = {
    '00': [0, 0, 0],        // Black
    '01': [255, 0, 0],      // Red
    '10': [0, 0, 255],      // Blue
    '11': [0, 255, 0]       // Green
  };

  const colors = [];
  for (let i = 0; i < binaryString.length; i += 2) {
    const bits = binaryString.substring(i, i + 2);
    colors.push(colorMap[bits] || [0, 0, 0]);
  }
  return colors;
};

module.exports = { convertDataToBinary, mapBinaryToColors};
