const API_BASE_URL = 'http://localhost:4000/';

const HttpListingService = {
  addListing: async (listingDetails) => {
    try {
      const response = await fetch(`${API_BASE_URL}estate/addListing`, {
        method: 'POST',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: listingDetails,
      });
      const resopnseData = await response.json();
      return resopnseData;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },

  getAllListings: async (keyword = '') => {
    try {
      const response = await fetch(
        `${API_BASE_URL}estate/getAllListings?keyword=${keyword}`,
        {
          method: 'GET',
          'Content-type': 'application/JSON',
        }
      );

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },

  getUserListings: async (userId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}estate/getUserListings?userId=${userId}`,
        {
          method: 'GET',
          'Content-type': 'application/JSON',
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },

  deleteListing: async (id) => {
    try {
      await fetch(`${API_BASE_URL}estate/deleteListing/${id}`, {
        method: 'DELETE',
        'Content-type': 'application/JSON',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
};

export default HttpListingService;
