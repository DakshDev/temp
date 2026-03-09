// Import all images from the portraits directory
const images = import.meta.glob('./*.{png,jpg,jpeg,svg,gif,webp}', { eager: true });

// Create an object with image names as keys
const portraits = {};

Object.keys(images).forEach((path) => {
  const fileName = path.replace('./', '').replace(/\.\w+$/, '');
  portraits[fileName] = images[path].default || images[path];
});

export default portraits;
