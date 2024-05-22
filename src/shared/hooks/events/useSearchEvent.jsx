import toast from "react-hot-toast";
import { searchEventRequest } from "../../../services/api";
import { useState } from "react";

export const useSearchEvent = () => {
    const [searchedEvents, setSearchedEvents] = useState(null);

    const searchEvents = async (searchQuery) => {
        try {
            const response = await searchEventRequest(searchQuery);
            if (response.error) {
                toast.error(
                    response?.err?.response?.data?.message ||
                    "Error al buscar eventos "
                )
            } else {
                setSearchedEvents(response.data.hotels);
            }
        } catch (error) {
            console.error("Error al buscar eventos:", error)
            toast.error("Error al buscar eventos")
        }
    }

    return {
        searchedEvents,
        isSearching: !searchedEvents,
        searchEvents,
    }
}
