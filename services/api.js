const BASE_URL = 'https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/summaryBookings';

const api = {
  getData: () => {
    return useFetch(BASE_URL, {
      key: 'id',
      default: () => []
    });
  },
};

export default api;