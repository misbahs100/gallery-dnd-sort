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
                    ? 'sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2'
                    : 'sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1'}
            `}
        >

            {/* custom class: image-container */}
            <div className="image-container">
                <img
                    src={image.src}
                    alt={`Image ${image.id}`}
                    className="w-full h-auto cursor-pointer "
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
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