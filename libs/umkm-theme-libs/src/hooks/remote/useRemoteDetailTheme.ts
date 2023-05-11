import { useCallback, useMemo } from 'react';

import useSwr from 'swr';
import { GetDetailThemeResponse } from '../../ts/Theme';
import themeDataMapper from '../../utils/mapper/themeDataMapper';

const useRemoteDetailTheme = () => {
  var urlParams = new URLSearchParams(window.location.search);

  var websiteName = urlParams.get('website');
  
  const uri = `/theme/${websiteName}`;
  const { data, ...others } = useSwr<GetDetailThemeResponse>(uri);
  
  const transformData = useCallback((data: GetDetailThemeResponse) => {
    return {
      ...data,
      data: themeDataMapper.toLocalMain(data.results),
    };
  }, []);

  const newData = useMemo(() => {
    if (data) {
      return transformData(data);
    }
    return data;
  }, [data, transformData]);

  return useMemo(() => ({ data: newData?.results, ...others }), [newData, others]);
};

export default useRemoteDetailTheme;

