import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:2656',
    timeout: 1000
});

apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) config.headers.Authorization = token
        return config
    },
    err => Promise.reject(err)
)

export const registerRequest = async (user) => {
    try {
        return await apiClient.post('/user/registerClient', user);
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};

export const loginRequest = async (user) => {
    try {
        return await apiClient.post('/user/login', user);
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};


export const getHotelRequest = async() => {
    try { 
        return await apiClient.get('hotel/get')
    }catch (err) {
        return {
            error: true,
            err
        }
    }
}


export const saveHotelRequest = async(hotel) => {
    try{
        return await apiClient.post('hotel/save', hotel, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const updateHotelRequest = async(id, hotel) => {
    try{
    return await apiClient.put(`/hotel/update/${id}`, hotel,{
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const deleteHotelRequest = async (id, image) => {
    try {
        return await apiClient.delete(`/hotel/delete/${id}`, { data: { image } });
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};

export const getEventsRequest = async() => {
    try { 
        return await apiClient.get('event/getAllEvents')
    }catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const saveEventRequest = async (event) => {
    try {
        return await apiClient.post(`/event/create`, event, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateEventRequest = async(id, event) => {
    try {
        return await apiClient.put(`/event/update/${id}`,event, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}
export const deleteEventRequest = async(id, image) => {
    try{
        return await apiClient.delete(`/event/deleteEvent/${id}`, { data: { image } })
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const getCategoryRequest = async() => {
    try{
        return await apiClient.get('/category/get')
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const searchHotelRequest = async (name) => {
    try {
        return await apiClient.post('/hotel/search', { name })
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const searchEventRequest = async (name) => {
    try {
        return await apiClient.post('/event/searchEvent', { name })
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//para la el perfil del usuario
export const getProfile = async () => {
    try {
        const response = await axios.get('/user/profile');
        return { data: response.data };
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateProfile = async (formData) => {
    try {
        const response = await axios.put('/user/profile', formData);
        return { data: response.data };
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};

