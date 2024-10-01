import 'react';

type CSSVarModel = {
  '--orange-color-050'?: string;
  '--orange-color-100'?: string;
  '--orange-color-200'?: string;
  '--orange-color-300'?: string;
  '--orange-color-400'?: string;
  '--orange-color-500'?: string;
  '--orange-color-600'?: string;
  '--orange-color-700'?: string;
  '--orange-color-800'?: string;
  '--orange-color-900'?: string;
  '--sunset-color-050'?: string;
  '--sunset-color-100'?: string;
  '--sunset-color-200'?: string;
  '--sunset-color-300'?: string;
  '--sunset-color-400'?: string;
  '--sunset-color-500'?: string;
  '--sunset-color-600'?: string;
  '--sunset-color-700'?: string;
  '--sunset-color-800'?: string;
  '--sunset-color-900'?: string;
  '--sunglow-color-050'?: string;
  '--sunglow-color-100'?: string;
  '--sunglow-color-200'?: string;
  '--sunglow-color-300'?: string;
  '--sunglow-color-400'?: string;
  '--sunglow-color-500'?: string;
  '--sunglow-color-600'?: string;
  '--sunglow-color-700'?: string;
  '--sunglow-color-800'?: string;
  '--sunglow-color-900'?: string;
  '--shamrock-color-050'?: string;
  '--shamrock-color-100'?: string;
  '--shamrock-color-200'?: string;
  '--shamrock-color-300'?: string;
  '--shamrock-color-400'?: string;
  '--shamrock-color-500'?: string;
  '--shamrock-color-600'?: string;
  '--shamrock-color-700'?: string;
  '--shamrock-color-800'?: string;
  '--shamrock-color-900'?: string;
  '--green-color-050'?: string;
  '--green-color-100'?: string;
  '--green-color-200'?: string;
  '--green-color-300'?: string;
  '--green-color-400'?: string;
  '--green-color-500'?: string;
  '--green-color-600'?: string;
  '--green-color-700'?: string;
  '--green-color-800'?: string;
  '--green-color-900'?: string;
  '--viking-color-050'?: string;
  '--viking-color-100'?: string;
  '--viking-color-200'?: string;
  '--viking-color-300'?: string;
  '--viking-color-400'?: string;
  '--viking-color-500'?: string;
  '--viking-color-600'?: string;
  '--viking-color-700'?: string;
  '--viking-color-800'?: string;
  '--viking-color-900'?: string;
  '--malibu-color-050'?: string;
  '--malibu-color-100'?: string;
  '--malibu-color-200'?: string;
  '--malibu-color-300'?: string;
  '--malibu-color-400'?: string;
  '--malibu-color-500'?: string;
  '--malibu-color-600'?: string;
  '--malibu-color-700'?: string;
  '--malibu-color-800'?: string;
  '--malibu-color-900'?: string;
  '--blue-color-050'?: string;
  '--blue-color-100'?: string;
  '--blue-color-200'?: string;
  '--blue-color-300'?: string;
  '--blue-color-400'?: string;
  '--blue-color-500'?: string;
  '--blue-color-600'?: string;
  '--blue-color-700'?: string;
  '--blue-color-800'?: string;
  '--blue-color-900'?: string;
  '--dodger-color-050'?: string;
  '--dodger-color-100'?: string;
  '--dodger-color-200'?: string;
  '--dodger-color-300'?: string;
  '--dodger-color-400'?: string;
  '--dodger-color-500'?: string;
  '--dodger-color-600'?: string;
  '--dodger-color-700'?: string;
  '--dodger-color-800'?: string;
  '--dodger-color-900'?: string;
  '--heliotrope-color-050'?: string;
  '--heliotrope-color-100'?: string;
  '--heliotrope-color-200'?: string;
  '--heliotrope-color-300'?: string;
  '--heliotrope-color-400'?: string;
  '--heliotrope-color-500'?: string;
  '--heliotrope-color-600'?: string;
  '--heliotrope-color-700'?: string;
  '--heliotrope-color-800'?: string;
  '--heliotrope-color-900'?: string;
  '--violet-color-050'?: string;
  '--violet-color-100'?: string;
  '--violet-color-200'?: string;
  '--violet-color-300'?: string;
  '--violet-color-400'?: string;
  '--violet-color-500'?: string;
  '--violet-color-600'?: string;
  '--violet-color-700'?: string;
  '--violet-color-800'?: string;
  '--violet-color-900'?: string;
  '--purple-color-050'?: string;
  '--purple-color-100'?: string;
  '--purple-color-200'?: string;
  '--purple-color-300'?: string;
  '--purple-color-400'?: string;
  '--purple-color-500'?: string;
  '--purple-color-600'?: string;
  '--purple-color-700'?: string;
  '--purple-color-800'?: string;
  '--purple-color-900'?: string;
  '--rosein-color-050'?: string;
  '--rosein-color-100'?: string;
  '--rosein-color-200'?: string;
  '--rosein-color-300'?: string;
  '--rosein-color-400'?: string;
  '--rosein-color-500'?: string;
  '--rosein-color-600'?: string;
  '--rosein-color-700'?: string;
  '--rosein-color-800'?: string;
  '--rosein-color-900'?: string;
  '--red-color-050'?: string;
  '--red-color-100'?: string;
  '--red-color-200'?: string;
  '--red-color-300'?: string;
  '--red-color-400'?: string;
  '--red-color-500'?: string;
  '--red-color-600'?: string;
  '--red-color-700'?: string;
  '--red-color-800'?: string;
  '--red-color-900'?: string;
  '--gray-color-000'?: string;
  '--gray-color-025'?: string;
  '--gray-color-050'?: string;
  '--gray-color-080'?: string;
  '--gray-color-100'?: string;
  '--gray-color-200'?: string;
  '--gray-color-300'?: string;
  '--gray-color-400'?: string;
  '--gray-color-500'?: string;
  '--gray-color-600'?: string;
  '--gray-color-700'?: string;
  '--gray-color-800'?: string;
  '--gray-color-900'?: string;
  '--gray-color-1000'?: string;
  '--primary-color'?: string;
  '--primary-color-hover'?: string;
  '--primary-color-active'?: string;
  '--primary-color-disabled'?: string;
  '--secondary-color'?: string;
  '--secondary-color-hover'?: string;
  '--secondary-color-active'?: string;
  '--secondary-color-disabled'?: string;
  '--tertiary-color'?: string;
  '--tertiary-color-hover'?: string;
  '--tertiary-color-active'?: string;
  '--tertiary-color-disabled'?: string;
  '--warn-color'?: string;
  '--warn-color-hover'?: string;
  '--warn-color-active'?: string;
  '--warn-color-disabled'?: string;
  '--success-color'?: string;
  '--success-color-hover'?: string;
  '--success-color-active'?: string;
  '--success-color-disabled'?: string;
  '--danger-color'?: string;
  '--danger-color-hover'?: string;
  '--danger-color-active'?: string;
  '--danger-color-disabled'?: string;
  '--natural-color'?: string;
  '--natural-color-hover'?: string;
  '--natural-color-active'?: string;
  '--natural-color-disabled'?: string;
  '--fill-color'?: string;
  '--fill-color-hover'?: string;
  '--fill-color-active'?: string;
  '--fill-color-select'?: string;
  '--fill-color-disabled'?: string;
  '--bg-color-normal'?: string;
  '--bg-color-navbar'?: string;
  '--bg-color-mask'?: string;
  '--bg-color-warp'?: string;
  '--bg-color-menu'?: string;
  '--bg-color-card'?: string;
  '--bg-color-control'?: string;
  '--bg-color-widgets'?: string;
  '--bg-color-tip'?: string;
  '--bg-color-float'?: string;
  '--bg-color-thumb'?: string;
  '--bg-color-danger'?: string;
  '--bg-color-warn'?: string;
  '--bg-color-success'?: string;
  '--border-color-1'?: string;
  '--border-color-2'?: string;
  '--border-color-3'?: string;
  '--border-color-hover'?: string;
  '--border-color-active'?: string;
  '--border-color-disabled'?: string;
  '--font-color-2'?: string;
  '--font-color-4'?: string;
  '--font-color-6'?: string;
  '--font-color-8'?: string;
  '--font-color-10'?: string;
  '--font-color-b8'?: string;
  '--font-color-warn'?: string;
  '--font-color-danger'?: string;
  '--font-color-success'?: string;
  '--font-color-disabled'?: string;
  '--font-color-highlight'?: string;
  '--icon-color'?: string;
  '--wave-color-0'?: string;
  '--wave-color-1'?: string;
  '--wave-color-2'?: string;
  '--wave-color-3'?: string;
  '--shadow-01'?: string;
  '--shadow-02'?: string;
  '--shadow-03'?: string;
  '--shadow-04'?: string;
  '--shadow-06'?: string;
  '--shadow-08'?: string;
  '--shadow-12'?: string;
  '--shadow-16'?: string;
  '--shadow-24'?: string;
  '--z-index-fixed'?: string;
  '--z-index-dropdown'?: string;
  '--z-index-tip'?: string;
  '--z-index-float'?: string;
  '--z-index-modal'?: string;
  '--z-index-drawer'?: string;
  '--z-index-toast'?: string;
  '--z-index-preview'?: string;
  '--z-index-notification'?: string;
  '--z-index-badge'?: string;
  '--gap-00'?: string;
  '--gap-01'?: string;
  '--gap-02'?: string;
  '--gap-03'?: string;
  '--gap-04'?: string;
  '--gap-05'?: string;
  '--gap-06'?: string;
  '--gap-07'?: string;
  '--gap-08'?: string;
  '--gap-09'?: string;
  '--gap-10'?: string;
  '--font-size-01'?: string;
  '--font-size-02'?: string;
  '--font-size-03'?: string;
  '--font-size-04'?: string;
  '--font-size-05'?: string;
  '--font-size-06'?: string;
  '--font-size-08'?: string;
  '--font-size-09'?: string;
  '--font-size-10'?: string;
  '--control-size-01'?: string;
  '--control-size-02'?: string;
  '--control-size-03'?: string;
  '--control-size-04'?: string;
  '--control-size-05'?: string;
  '--control-size-06'?: string;
  '--control-size-07'?: string;
  '--control-size-08'?: string;
  '--border-radius-02'?: string;
  '--border-radius-03'?: string;
  '--border-radius-04'?: string;
  '--border-radius-05'?: string;
  '--border-radius-06'?: string;
  '--border-radius-10'?: string;
};

declare module 'react' {
  export type CSSVarProps = CSSVarModel;
  export interface CSSProperties extends CSSVarProps {}
}