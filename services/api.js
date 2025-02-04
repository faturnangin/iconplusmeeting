const BASE_URL = 'https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/summaryBookings';

const api = {
  getData: () => {
    return useFetch(BASE_URL, {
      key: 'id',
      default: () => []
    });
  },
  getMasterOffice: () => {
    return useFetch(`https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterOffice`, {
      key: 'officeName',
      default: () => []
    });
  },
};

export default api;