import { render } from '@testing-library/react';

import Header1 from './header1';

describe('Header1', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Header1 />);
    expect(baseElement).toBeTruthy();
  });
});
