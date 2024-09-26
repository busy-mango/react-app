import { IFlex } from '@/components';

const colors = [
  'orange',
  'sunset',
  'sunglow',
  'shamrock',
  'green',
  'viking',
  'malibu',
  'blue',
  'dodger',
  'heliotrope',
  'violet',
  'purple',
  'rosein',
  'red',
  'gray',
];

const steps = Array.from({ length: 10 }, (_, i) =>
  i === 0 ? '050' : (i * 100).toString()
);

export const ColorDisc: React.FC = () => {
  return (
    <div style={{}}>
      {colors.map((color) => (
        <IFlex key={color} gap={8}>
          {steps.map((step) => (
            <div
              key={step}
              style={{
                width: '1em',
                height: '1em',
                backgroundColor: `rgb(var(--${color}-color-${step}) / 1)`,
              }}
            />
          ))}
        </IFlex>
      ))}
    </div>
  );
};
