import { Navbar } from '../navbar/Navbar';

export const ProfileView = ({ formData, isEditing, setIsEditing, handleChange, handleSave, handleCancel }) => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="profile-container">
                    <h2>Perfil del Usuario</h2>
                    <div className="card">
                        <div className="card-body">
                            <div className="form-item">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="form-item">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="form-item">
                                <label htmlFor="phone" className="form-label">Teléfono</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="form-item">
                                <label htmlFor="address" className="form-label">Dirección</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="buttons-container">
                                {isEditing ? (
                                    <>
                                        <button className="btn btn-success rounded" onClick={handleSave}>Guardar</button>
                                        <button className="btn btn-danger rounded" onClick={handleCancel}>Cancelar</button>
                                    </>
                                ) : (
                                    <button className="btn btn-primary edit-button rounded" onClick={() => setIsEditing(true)}>Editar</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .container {
                    background-color: #ecf8d4;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Agregar sombra */
                }
                
                .profile-container {
                    background-color: #e0deab;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                }
                .card {
                    background-color: #cb8e5f;
                    border-radius: 10px;
                }
                .form-item {
                    margin-bottom: 15px;
                }
                .form-label {
                    color: #85685a;
                    font-weight: bold;
                    margin-bottom: 5px;
                    display: block;
                }
                .form-control {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-sizing: border-box;
                }
                .buttons-container {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 15px;
                }
                
                .rounded {
                    border-radius: 20px;
                }
            `}</style>
        </>
    )
}
