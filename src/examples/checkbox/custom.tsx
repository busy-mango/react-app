import type { ICheckboxProps } from '@/components';
import { ICheckbox, IFlex, IWaveWrap } from '@/components';

import FavoriteFlatSVG from '@/icons/favorite.flat.svg?react';
import FavoriteSVG from '@/icons/favorite.svg?react';

const ICheckFavorite: React.FC<ICheckboxProps> = (props) => (
  <ICheckbox
    render={{
      icon: ({ wave, inputRef }, { checked }) => (
        <IWaveWrap
          enabled={wave}
          style={{
            borderRadius: 'var(--border-radius-10)',
            color: 'rgb(var(--rosein-color-600) / 1)',
          }}
          target={inputRef}
        >
          {checked ? <FavoriteFlatSVG /> : <FavoriteSVG />}
        </IWaveWrap>
      ),
    }}
    {...props}
  />
);

const App: React.FC = () => (
  <IFlex gap={16}>
    <ICheckFavorite label="Favorite" />
  </IFlex>
);

export default App;
