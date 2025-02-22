import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import classNames from 'classnames';
import './slider.css';

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max?: number;
  step?: number;
}

export const Slider: React.FC<SliderProps> = ({ value, onValueChange, max = 255, step = 1 }) => {
  return (
    <RadixSlider.Root
      className="slider-root"
      value={value}
      onValueChange={onValueChange}
      max={max}
      step={step}
      aria-label="Threshold"
    >
      <RadixSlider.Track className="slider-track">
        <RadixSlider.Range className="slider-range" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="slider-thumb" />
    </RadixSlider.Root>
  );
};
