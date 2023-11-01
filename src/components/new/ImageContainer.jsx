import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PropTypes from 'prop-types';

const ImageContainer = ({ image, handleImageClick }) => {
    // validation: declaring prop types
    ImageContainer.propTypes = {
        image: PropTypes.object.isRequired,
        handleImageClick: PropTypes.func.isRequired
    };

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
                className="bg-columnBackgroundColor  opacity-40  border-2 border-pink-500 w-[150px]  h-[100px]  max-h-[500px]  rounded-md flex  flex-col"
            ></div>
        );
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            className=" w-[150px] h-[100px] max-h-[500px] rounded-md flex  flex-col "
        >
            {/* Image container */}
            <div
                {...attributes}
                {...listeners}
                className=" text-md h-[100px] cursor-grab  rounded-md rounded-b-none  p-3 font-bold border-4 flex items-center justify-center "
            >
                <div className="flex gap-2 ">
                    <input type="checkbox" name="dd" id="dd" onClick={() => handleImageClick(image.id)} />
                    <img
                        alt="gallery"
                        className="  object-cover object-center"
                        src={image.src}
                        style={{ width: '90px', border: '1px solid red' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageContainer;