// FileUploadForm.jsx
"use client";

import React, { useState, useEffect } from 'react';
import AddProjectForm from './addProject';
const FileUploadForm = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imageCount, setImageCount] = useState(0);
    const [formData, setFormData] = useState({
        Category: '',
    });
    const [categories, setCategories] = useState([]);
    const [btnText, setBtnText] = useState('Submit');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryImages, setCategoryImages] = useState([]);

    // Create a separate state for image names
    const [newImageNames, setNewImageNames] = useState({});

    useEffect(() => {
        fetch('https://api.designindianwardrobe.com/api/projects')
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetch(`https://api.designindianwardrobe.com/api/project-images/${selectedCategory}`)
                .then((response) => response.json())
                .then((data) => {
                    setCategoryImages(data);
                    setImageCount(data.length);
                    // Initialize the newImageNames state with default values
                    const names = {};
                    data.forEach((image) => {
                        names[image.id] = image.filename;
                    });
                    setNewImageNames(names);
                })
                .catch((error) => console.error('Error fetching category images:', error));
        }
    }, [selectedCategory]);

    const handleFileChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();

        selectedFiles.forEach((file) => {
            formDataToSend.append('images', file);
        });

        formDataToSend.append('category_id', formData.Category);

        try {
            const response = await fetch('https://api.designindianwardrobe.com/api/projects/upload-image', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                setBtnText('Done');
                console.log('Form data and files uploaded successfully!');
            } else {
                setBtnText('Something Went Wrong');
                console.error('Form data and file upload failed.');
            }
        } catch (error) {
            setBtnText('Something Went Wrong');
            console.error('Error during form data and file upload:', error);
        }
    };

    const handleDelete = async (imageId, imageName) => {
        try {
            const response = await fetch(`https://api.designindianwardrobe.com/api/project-images/delete/${imageId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Image deleted successfully:', imageName);
                setCategoryImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
                // Show alert with the image name
                window.alert(`Image "${imageName}" deleted successfully!`);
            } else {
                console.error('Image delete failed:', imageName);
            }
        } catch (error) {
            console.error('Error during image delete:', error);
        }
    };

    const handleUpdate = async (imageId) => {
        try {
            const response = await fetch(`https://api.designindianwardrobe.com/api/project-images/update/${imageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newFilename: newImageNames[imageId] }),
            });

            if (response.ok) {
                console.log('Image updated successfully:', newImageNames[imageId]);
                setCategoryImages((prevImages) =>
                    prevImages.map((img) =>
                        img.id === imageId ? { ...img, filename: newImageNames[imageId] } : img
                    )
                );

                // Show alert with the updated image name
                window.alert(`Image updated successfully! New name: "${newImageNames[imageId]}"`);
            } else {
                console.error('Image update failed:', newImageNames[imageId]);
            }
        } catch (error) {
            console.error('Error during image update:', error);
        }
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleScroll = (direction) => {
        const container = document.querySelector('.tabs-container');
        if (container) {
            if (direction === 'left') {
                container.scrollLeft -= 100;
            } else if (direction === 'right') {
                container.scrollLeft += 100;
            }
        }
    };

    const handleNameChange = (imageId, newName) => {
        setNewImageNames((prevNames) => ({ ...prevNames, [imageId]: newName }));
    };

    return (
       
        <div className="container mx-auto p-4 w-[100%]">
          <AddProjectForm/>
            <h1 className='text-center font-bold uppercase text-4xl '>Upload Images As Project Wise</h1>
            <form onSubmit={handleSubmit} className='flex justify-center mt-8'>
                <label htmlFor="file" className='text-lg font-bold uppercase'>Select Images: </label>
                <input className='rounded-lg ml-4' type="file" id="file" name="file" onChange={handleFileChange} multiple />

                <label htmlFor="Category" className='text-lg font-bold uppercase' >Project Name</label>
                <select 

                    id="Category"
                    name="Category"
                    onChange={handleChange}
                    className='truncate  w-[400px]'
                    
                    defaultValue=""
                    style={{ color: 'black', marginLeft: "30px", borderRadius: "5px",  }}
                >
                    <option value="" disabled hidden>
                        Select project
                    </option>
                    {categories.map((category) => (
                        <option
                            className=''
                            key={category.id}
                            value={category.id}
                            style={{ backgroundColor: 'white' }}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

                <button className='px-12 py-2 ml-2 rounded-lg bg-green-600' type="submit">{btnText}</button>
            </form>

            <div className="mt-4 relative">
                <button
                    className="bg-red-700 text-white px-8 py-6 rounded-full absolute left-[-10px] top-10 z-10 transform -translate-y-1/2"
                    onClick={() => handleScroll('left')}
                >
                    &lt;
                </button>
                <div className="tabs-container flex space-x-4 overflow-auto">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`truncate bg-blue-500 text-white px-8 py-2 rounded-lg transition-transform transform hover:scale-105 my-auto mt-4 whitespace-nowrap md:mr-0 ${selectedCategory === category.id ? 'bg-red-700' : ''
                                }`}
                            style={{ width: 'auto', height: '50px', minWidth: '350px' }}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                <button
                    className="bg-red-700 text-white px-8 py-6 rounded-full absolute right-[-10px] top-10 z-10 transform -translate-y-1/2"
                    onClick={() => handleScroll('right')}
                >
                    &gt;
                </button>
            </div>

            <div className="mt-8">
                <h2 className='text-center font-bold text-2xl mt-4'>Total Project Images {`(${imageCount})`}</h2>
                <ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-7 mt-16">
                        {categoryImages.map((image) => (
                            <li key={image.id} className="items-center space-x-2">
                                <img
                                    src={`http://api.designindianwardrobe.com/project-upload/${image.filename}`}
                                    alt={image.filename}
                                    width="100"
                                    height="100"
                                    style={{
                                        width: '450px',
                                        height: '250px',
                                        borderRadius: '10px',
                                        objectFit: 'cover',
                                    }}
                                />
                                <p>{image.filename}</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDelete(image.id, image.filename)}
                                        className="px-4 rounded-lg py-2 bg-red-500"
                                    >
                                        DELETE
                                    </button>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="New Image Name"
                                            value={newImageNames[image.id] || ''}
                                            style={{
                                                background: 'red',
                                                border: '2px solid white',
                                                borderRadius: '5px',
                                                height: '50px',
                                                color: 'white',
                                            }}
                                            onChange={(e) =>
                                                handleNameChange(image.id, e.target.value)
                                            }
                                        />
                                        <button
                                            onClick={() => handleUpdate(image.id)}
                                            className="bg-green-600 px-8 py-4 ml-2 rounded-lg"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
       
    );
};

export default FileUploadForm;
