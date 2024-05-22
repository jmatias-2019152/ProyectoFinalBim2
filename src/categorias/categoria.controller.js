import Categoria from './categoria.model.js'

//Crear categoria
export const crearCategoria = async (req, res) => {
    try {
        const data = req.body
        const categoria = new Categoria(data)
        await categoria.save()
        return res.send({ message: `Category saved succesfully: ${categoria.name}` })
    } catch (error) {
        console.error(error)
        return res.status(200).send({ message: 'Error saving category', err: err })
    }
}

//Obteniene las categorias
export const listarCategorias = async (req, res) => {
    try {
        const categoria = await Categoria.find();
        return res.send(categoria)
    } catch (error) {
        console.error(error);
        return res.status(404).send({ message: 'error getting category' })
    }
}

//Actualizar categoria
export const actualizarCategoria = async (req, res) => {
    try {
        const data = req.body
        const { id } = req.params
        if (update === false) return res.status(400).send({ message: 'enter all data' })
        const categoria = await Categoria.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!categoria) return res.status(401).send({ message: 'Category not found and not updated' })
        return res.send({ message: 'Updated category', categoria })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'error updating' })

    }
}

//Buscar categoria
export const buscarCategoria = async (req, res) => {
    try {
        const { search } = req.body
        const aprox = new RegExp(search, 'i')
        const categoria = await Categoria.find({ name: aprox })
        if (!categoria) return res.status(404).send({ message: 'Category not found' })
        return res.send({ message: 'Category found', categoria })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error searching Category' })
    }
}

//Eliminar la categoria
export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Categoria.findOneAndDelete({ _id: id });
        if (!deletedCategory) return res.status(404).send({ message: 'Category not found and not deleted' })
        return res.send({ message: `Category with name ${deletedCategory.name} deleted successfully` })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error deleting Category' });
    }
}