import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PropTypes from 'prop-types';
import { useState } from "react";

const ImageContainer = ({ i, image, handleImageClick }) => {
    // validation: declaring prop types
    ImageContainer.propTypes = {
        image: PropTypes.object.isRequired,
        i: PropTypes.number.isRequired,
        handleImageClick: PropTypes.func.isRequired
    };

    const [isHovered, setIsHovered] = useState(false)

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: image.id,
        src: image.src
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    // display of an image which is being dragged
    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className={`hover:opacity-75 relative  border border-gray-300 ${i === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'} ${image.selected ? 'bg-gray-100' : ''} checkbox-visible `}
            >

                <img
                    src={image.src}
                    alt={`Image ${image.id}`}
                    className="w-full h-auto cursor-pointer"
                />
            </div>
        );
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={` relative border border-gray-300 
            ${image.selected ? 'hover:bg-gray-300 opacity-50' : ' '} 
            checkbox-visible
             ${i === 0
                    ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2'
                    : 'sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1'}
            `}
        >

            {/* custom class: image-container */}
            <div className="image-container">
                {
                    image.src ?
                        <img
                            src={image.src}
                            loading="lazy"
                            alt={`Image ${image.id}`}
                            className="w-full h-auto cursor-pointer "
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        />
                        :
                        // skeleton for unloaded images
                        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                </svg>
                            </div>
                        </div>
                }
                

            </div>

            {/* checkbox input */}
            <div
                className={` checkbox-hidden ${image.selected || isHovered ? '' : 'hidden'}`}
            >
                <input type="checkbox" name="selected_image" id="selected_image"
                    onClick={() => handleImageClick(image.id)}
                    className="absolute top-2 left-2"
                    checked={image.selected}
                />
            </div>

        </div>
    );
};

export default ImageContainer;