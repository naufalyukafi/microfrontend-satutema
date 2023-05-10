import { render } from '@testing-library/react';

import UmkmThemeLibs from './umkm-theme-libs';

describe('UmkmThemeLibs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UmkmThemeLibs />);
    expect(baseElement).toBeTruthy();
  });
});
