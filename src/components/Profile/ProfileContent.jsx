import { useState, useEffect } from 'react'
import { PacmanLoader } from 'react-spinners'
import { getProfile, updateProfile } from '../../services/api'
import { ProfileView } from './ProfileView'

export const ProfileContent = () => {
    const [user, setUser] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })
    const [originalFormData, setOriginalFormData] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await getProfile()
            if (!response.error) {
                setUser(response.data)
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    address: response.data.address
                });
                setOriginalFormData({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    address: response.data.address
                })
                setIsLoading(false)
            } else {
                console.error('Error al obtener el perfil del usuario:', response.err)
                setIsLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {
        const response = await updateProfile(formData)
        if (!response.error) {
            setUser(response.data)
            setIsEditing(false)
            setOriginalFormData({
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone,
                address: response.data.address
            })
        } else {
            console.error('Error al actualizar el perfil del usuario:', response.err)
        }
    }

    const handleCancel = () => {
        setFormData(originalFormData)
        setIsEditing(false)
    }

    if (isLoading) {
        return (
            <div className="container d-flex align-items-center justify-content-center vh-100">
                <PacmanLoader color="#ffe733" />
            </div>
        )
    }

    return (
        <ProfileView
            formData={formData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleChange={handleChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
        />
    )
}
