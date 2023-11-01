import pic_1 from '../../assets/images/image-1.webp'
import pic_2 from '../../assets/images/image-2.webp'
import pic_3 from '../../assets/images/image-3.webp'
import pic_4 from '../../assets/images/image-4.webp'
import pic_5 from '../../assets/images/image-5.webp'
import { useMemo, useState } from "react";
import ImageContainer from './ImageContainer'
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

// dummy data
const dummyData = [
    { id: 1, src: pic_1, selected: false },
    { id: 2, src: pic_2, selected: false },
    { id: 3, src: pic_3, selected: false },
    { id: 4, src: pic_4, selected: false },
    { id: 5, src: pic_5, selected: false },
]

const ImageGallery = () => {
    const [images, setImages] = useState(dummyData)
    const imagesId = useMemo(() => images.map((col) => col.id), [images]);
    const [activeImage, setActiveImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const handleImageClick = (id) => {
        // Toggle image selection
        const updatedImages = images.map((image) =>
            image.id === id ? { ...image, selected: !image.selected } : image
        );
        setImages(updatedImages);

        // Update selected images
        const newSelectedImages = updatedImages.filter((image) => image.selected);
        setSelectedImages(newSelectedImages);
    };

    const handleDeleteSelected = () => {
        // Delete selected images
        const remainingImages = images.filter((image) => !image.selected);
        setImages(remainingImages);

        // Clear selected images
        setSelectedImages([]);
    };

    const createNewImage = () => {
        const imageToAdd = {
            id: generateId(),
        };
        console.log(imageToAdd)
        setImages([...images, imageToAdd]);
    }

    const generateId = () => {
        /* Generate a random number between 0 and 10000 */
        return Math.floor(Math.random() * 10001);
    }

    const onDragStart = (event) => {
        // console.log(event)
        setActiveImage(event.active.data.current?.sortable.index);
        return;

    }

    const onDragEnd = (event) => {
        setActiveImage(null);

        const { active, over } = event;
        if (!over) return;
        // console.log(over.id)

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        console.log("DRAG END");

        setImages((images) => {
            const activeImageIndex = images.findIndex((img) => img.id === activeId);

            const overImageIndex = images.findIndex((img) => img.id === overId);

            console.log(activeImageIndex)

            return arrayMove(images, activeImageIndex, overImageIndex);
        });
    }





    return (

        <div
            className="m-auto flex  min-h-screen  w-full items-center overflow-x-auto overflow-y-hidden px-[40px]"
            style={{ border: '5px solid green' }}
        >
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            // onDragOver={onDragOver}
            >
                <div className="m-auto flex gap-4">
                    <div className="flex flex-wrap gap-4">
                        <SortableContext items={imagesId}>
                            {images.map((image) => (
                                <ImageContainer
                                    key={image.id}
                                    image={image}
                                    handleImageClick={handleImageClick}
                                />
                            ))}

                            <button
                                onClick={() => { createNewImage(); }}
                                className=" h-[100px] w-[150px] min-w-[150px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor  p-4 ring-rose-500  hover:ring-2 flex  gap-2 "
                            >
                                Add
                            </button>
                        </SortableContext>
                    </div>
                </div>

                {/* if the dragging has to work while scrolling: DrgOverlay */}
                {/* {createPortal(
                    <DragOverlay>
                        {activeImage && (
                            <ImageContainer
                                image={activeImage}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )} */}
            </DndContext>

            {/* showing deletion bar */}
            <div className="my-4 ">
                <p>{`${selectedImages.length} image(s) selected`}</p>
                {selectedImages.length > 0 && (
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                        onClick={handleDeleteSelected}
                    >
                        Delete Selected
                    </button>
                )}
            </div>
        </div>


    );
};

export default ImageGallery;