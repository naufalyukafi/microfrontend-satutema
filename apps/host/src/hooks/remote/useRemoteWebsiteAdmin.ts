import { useCallback, useMemo } from 'react';

import useSwr from 'swr';
import { GetAllWebsiteResponse, GetWebsiteResponse} from '../../ts/Website';
import websiteDataMapper from '../../utils/mapper/websiteDataMapper';

const useRemoteWebsiteAdmin = () => {
  const uri = `/admin/website`;
  const { data, ...others } = useSwr<GetAllWebsiteResponse>(uri);

  const transformData = useCallback((data: GetAllWebsiteResponse) => {
    return {
      ...data,
      data: websiteDataMapper.toLocalMainList(data.results),
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

export default useRemoteWebsiteAdmin;

