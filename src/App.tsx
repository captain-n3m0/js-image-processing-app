import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Slider } from './components/ui/slider';

import { motion } from 'framer-motion';
import './App.css';

const App = () => {
  const [image, setImage] = useState<string | null>(null);
  const [threshold, setThreshold] = useState(128);
  const [channels, setChannels] = useState<{ red: string | null, green: string | null, blue: string | null }>({
    red: null,
    green: null,
    blue: null,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThresholdChange = (value: number[]) => {
    setThreshold(value[0]);
  };

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const { data, width, height } = imgData;
          const red = ctx.createImageData(width, height);
          const green = ctx.createImageData(width, height);
          const blue = ctx.createImageData(width, height);

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i] > threshold ? data[i] : 0;
            const g = data[i + 1] > threshold ? data[i + 1] : 0;
            const b = data[i + 2] > threshold ? data[i + 2] : 0;
            red.data.set([r, 0, 0, data[i + 3]], i);
            green.data.set([0, g, 0, data[i + 3]], i);
            blue.data.set([0, 0, b, data[i + 3]], i);
          }

          const getDataURL = (channel: ImageData) => {
            ctx.putImageData(channel, 0, 0);
            return canvas.toDataURL();
          };

          setChannels({
            red: getDataURL(red),
            green: getDataURL(green),
            blue: getDataURL(blue),
          });
        }
      };
    }
  }, [image, threshold]);

  return (
    <motion.div className="app-container">
      <Card className="glass-card">
        <CardContent>
          <h1 className="title">Image Processing App</h1>
          <input type="file" onChange={handleImageUpload} />
          {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
          <Slider value={[threshold]} onValueChange={handleThresholdChange} max={255} step={1} />
          <p>Threshold: {threshold}</p>
          <div className="channels">
            {channels.red && <img src={channels.red} alt="Red Channel" className="channel" />}
            {channels.green && <img src={channels.green} alt="Green Channel" className="channel" />}
            {channels.blue && <img src={channels.blue} alt="Blue Channel" className="channel" />}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default App;
