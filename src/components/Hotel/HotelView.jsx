import { useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import { useDeleteHotel } from '../../shared/hooks/hotels/useDeleteHotel';
import { useSaveHotel } from '../../shared/hooks/hotels/useSaveHotel';
import { useUpdateHotel } from '../../shared/hooks/hotels/useUpdateHotel';
import { searchHotelRequest } from '../../services/api';
import './HotelStyle.css';
import toast from 'react-hot-toast';

const useSelectedCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  return { selectedCategory, setSelectedCategory };
};

const FormAdmin = ({ categories, selectedCategory, setSelectedCategory, hotel, getHotels, setEditingHotel }) => {
  const { save } = useSaveHotel();
  const { updateHotel } = useUpdateHotel();
  const { deleteHotel } = useDeleteHotel();
  const [formData, setFormData] = useState({
    nameT: '',
    ubication: '',
    phone: '',
    email: '',
    image: null,
  });

  useEffect(() => {
    if (hotel) {
      setFormData({
        nameT: hotel.name,
        ubication: hotel.ubication,
        phone: hotel.phone,
        email: hotel.email,
        image: null,
      });
      setSelectedCategory(hotel.category ? hotel.category._id : '');
    }
  }, [hotel, setSelectedCategory]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData((prevData) => ({
        ...prevData,
        image: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const clearForm = () => {
    setFormData({
      nameT: '',
      ubication: '',
      phone: '',
      email: '',
      image: null,
    });
    setEditingHotel(null);
    const fileInput = document.getElementById('image');
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const onHandleSave = async () => {
    try {
      const hotelData = {
        name: formData.nameT,
        ubication: formData.ubication,
        phone: formData.phone,
        email: formData.email,
        image: formData.image,
      };
      if (hotel) {
        await updateHotel(hotel._id, hotelData);
      } else {
        await save(
          formData.nameT,
          selectedCategory,
          formData.ubication,
          formData.phone,
          formData.email,
          formData.image
        );
      }
      getHotels();
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center">
              <h4 className="card-title mb-0">{hotel ? 'Actualizar Hotel' : 'Agregar Hotel'}</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="nameT" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nameT"
                  placeholder="Ingresa el nombre"
                  name="nameT"
                  value={formData.nameT}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="form-label">Categoría</label>
                <select
                  id="category"
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ubication" className="form-label">Ubicación</label>
                <input
                  type="text"
                  className="form-control"
                  id="ubication"
                  placeholder="Ingresa la ubicación"
                  name="ubication"
                  value={formData.ubication}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Ingresa el teléfono"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ingresa el email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image" className="form-label">Imagen</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onHandleSave}
                >
                  {hotel ? 'Actualizar' : 'Guardar'}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={clearForm}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
<style jsx>{`
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ecf8d4; /* color1 */
  }

  .card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    background-color: #cb8e5f; /* color3 */
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 15px 0;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0;
  }

  .card-body {
    padding: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    font-weight: bold;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .form-select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .d-flex {
    display: flex;
  }

  .justify-content-between {
    justify-content: space-between;
  }

  .btn {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-success {
    background-color: #4a90e2; /* color1 */
    color: #fff;
  }

  .btn-danger {
    background-color: #cb8e5f; /* color3 */
    color: #fff;
  }

  .btn:hover {
    background-color: #333;
  }
`}</style>




const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#cb8e5f' }} className="bg-color3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 style={{ color: '#0d0502' }} className="color5">Trinal</h5>
            <p>Hotel | Trinal</p>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: '#0d0502' }} className="color5">Dirección</h5>
            <p>Guatemala, Guatemala City</p>
          </div>
          <div className="col-md-4">
            <h5 style={{ color: '#0d0502' }} className="color5">Contacto</h5>
            <p>Teléfono: +502 1234 1234</p>
            <p>Email: trinal@gmail.com</p>
          </div>
        </div>
        <div className="mt-3">
          <p style={{ color: '#0d0502' }} className="color5">&copy; {new Date().getFullYear()} The Cutest. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}


export const HotelView = ({ hotels, categories, getHotels }) => {
  const { selectedCategory, setSelectedCategory } = useSelectedCategory()
  const userRole = localStorage.getItem('userRole')
  const [editingHotel, setEditingHotel] = useState(null)
  const [searchName, setSearchName] = useState('')
  const [foundHotels, setFoundHotels] = useState(null)

  const { deleteHotel } = useDeleteHotel()

  const handleDeleteHotel = async (hotelId) => {
    try {
      await deleteHotel(hotelId)
      getHotels();
    } catch (error) {
      console.error('Error al eliminar el hotel:', error)
    }
  };

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setSelectedCategory(hotel.category ? hotel.category._id : '')
  }

  const handleSearch = async () => {
    try {
      const response = await searchHotelRequest(searchName)
      if (response.error) {
        toast.error('Error al buscar hoteles:', response.err)
      } else {
        console.log('Hoteles encontrados:', response.data.hotels)
        if (response.data.hotels.length > 0) {
          setFoundHotels(response.data.hotels)
        } else {
          toast.error('No se encontraron hoteles')
          setFoundHotels(null)
        }
      }
    } catch (error) {
      console.error('Error al buscar hoteles:', error)
    }
  };

  const handleCancelSearch = () => {
    setFoundHotels(null);
    setSearchName('');
  };

  return (
    <>
      <style>
      {`
        /* Estilos CSS */

        /* Colores */
        :root {
          --primary-color: #ecf8d4; /* Verde claro */
          --secondary-color: #e0deab; /* Verde claro */
          --text-color: #cb8e5f; /* Marrón */
          --background-color: #85685a; /* Marrón */
          --accent-color: #0d0502; /* Negro */
        }

        /* Estilos generales */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: var(--background-color);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Estilos para el formulario de búsqueda */
        .input-group {
          margin-bottom: 20px;
        }

        .input-group input[type="text"] {
          border: 1px solid var(--primary-color);
          border-radius: 5px;
          padding: 10px;
          width: 70%;
        }

        .input-group button {
          background-color: var(--secondary-color);
          color: var(--accent-color);
          border: none;
          border-radius: 5px;
        }

        /* Estilos para las tarjetas de hotel */
        .card {
          font-size: 1.2rem;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .card-title {
          font-weight: bold;
          margin-bottom: 10px;
          color: var(--text-color);
        }

        .card-subtitle {
          margin-bottom: 10px;
          color: var(--text-color);
        }

        .card-body {
          padding: 20px;
          color: var(--text-color);
        }

        .card-image {
          width: 45%;
          height: 50%;
        }

        .hotel-buttons {
          display: flex;
          justify-content: flex-end;
        }

        .hotel-buttons button {
          margin-left: 10px;
        }
      `}
    </style>
  
      <Navbar />
      {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
        <FormAdmin
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          hotel={editingHotel}
          getHotels={getHotels}
          setEditingHotel={setEditingHotel}
        />
      )}
      <br />
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-8">
            <div className="input-group shadow-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar hoteles por nombre"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button className="btn btn-primary ms-2" onClick={handleSearch}>
                Buscar
              </button>
              <button className="btn btn-secondary ms-2" onClick={handleCancelSearch}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-4">
        {(foundHotels !== null ? foundHotels : hotels).map((hotel) => (
          <div key={hotel._id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h4 className="card-title">{hotel.name}</h4>
                <h5 className="card-subtitle mb-2 text-muted">
                  Categoría: {hotel.category ? hotel.category.name : 'Sin categoría'}
                </h5>
                <div className="d-flex justify-content-center">
                  <img
                    src={`http://localhost:2656/hotel/getImg/${hotel._id}?timestamp=${Date.now()}`}
                    className="card-image"
                    crossOrigin="anonymous"
                    alt="Hotel"
                  />
                </div>
                <p className="card-text">Ubicación: {hotel.ubication}</p>
                <p className="card-text">Teléfono: {hotel.phone}</p>
                <p className="card-text">Email: {hotel.email}</p>
                {(userRole === 'ADMIN' || userRole === 'MANAGER') && (
                  <div className="hotel-buttons">
                    <button
                      type="button"
                      className="btn btn-warning btn-lg"
                      onClick={() => handleEditHotel(hotel)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-lg"
                      onClick={() => handleDeleteHotel(hotel._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}  