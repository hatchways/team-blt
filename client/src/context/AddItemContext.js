import React, { createContext, useState } from 'react';

export const AddItemProvider = createContext();

function AddItemContext({ children }) {
    const [openDialogue, setOpenDialogue] = useState(false);
    const openItemDialogue = ()=> setOpenDialogue(true);
    const closeDialogue = ()=> setOpenDialogue(false);
    const [selectedListIndex, setSelectedListIndex] = useState("");
    const [inputLink, setInputLink] = useState("");

    const addButtonClick = async (e) => {    
        openItemDialogue();   
    };
      
    const onChangeList = (e) => {
        const newIndex = parseInt(e.target.value);
        setSelectedListIndex(newIndex);    
    };

    const AddItemContexts = {
        openDialogue,
        setOpenDialogue,
        openItemDialogue,
        closeDialogue,
        selectedListIndex,
        setSelectedListIndex,
        inputLink,
        setInputLink,
        addButtonClick,
        onChangeList
    };

    return (
        <AddItemProvider.Provider value={AddItemContexts}>
            {children}
        </AddItemProvider.Provider>
    )
}

export default AddItemContext
