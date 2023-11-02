import pic_1 from '../../assets/images/image-1.webp'
import pic_2 from '../../assets/images/image-2.webp'
import pic_3 from '../../assets/images/image-3.webp'
import pic_4 from '../../assets/images/image-4.webp'
import pic_5 from '../../assets/images/image-5.webp'
import pic_6 from '../../assets/images/image-6.webp'
import pic_7 from '../../assets/images/image-7.webp'
import pic_8 from '../../assets/images/image-8.webp'
import pic_9 from '../../assets/images/image-9.webp'
import pic_10 from '../../assets/images/image-10.jpeg'
import pic_11 from '../../assets/images/image-11.jpeg'
import add_pic from '../../assets/images/add2.jpeg'
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
    { id: 6, src: pic_6, selected: false },
    { id: 7, src: pic_7, selected: false },
    { id: 8, src: pic_8, selected: false },
    { id: 9, src: pic_9, selected: false },
    { id: 10, src: pic_10, selected: false },
    { id: 11, src: pic_11, selected: false },
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

        // <div
        //     className="m-auto flex   w-full items-center overflow-x-auto overflow-y-hidden px-[40px]"
        //     style={{ border: '5px solid green' }}
        // >
        //     <DndContext
        //         sensors={sensors}
        //         onDragStart={onDragStart}
        //         onDragEnd={onDragEnd}
        //     // onDragOver={onDragOver}
        //     >
        //         <div className="m-auto flex gap-4">
        //             <div className="flex flex-wrap gap-4">
        //                 <SortableContext items={imagesId}>
        //                     {images.map((image) => (
        //                         <ImageContainer
        //                             key={image.id}
        //                             image={image}
        //                             handleImageClick={handleImageClick}
        //                         />
        //                     ))}

        //                     <button
        //                         onClick={() => { createNewImage(); }}
        //                         className=" h-[100px] w-[150px] min-w-[150px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor  p-4 ring-rose-500  hover:ring-2 flex  gap-2 "
        //                     >
        //                         Add Image
        //                     </button>
        //                 </SortableContext>
        //             </div>
        //         </div>

        //         {/* if the dragging has to work while scrolling: DrgOverlay */}
        //         {/* {createPortal(
        //             <DragOverlay>
        //                 {activeImage && (
        //                     <ImageContainer
        //                         image={activeImage}
        //                     />
        //                 )}
        //             </DragOverlay>,
        //             document.body
        //         )} */}
        //     </DndContext>

        //     {/* showing deletion bar */}
        //     <div className="my-4 ">
        //         <p>{`${selectedImages.length} image(s) selected`}</p>
        //         {selectedImages.length > 0 && (
        //             <button
        //                 className="bg-red-500 text-white px-4 py-2 rounded ml-4"
        //                 onClick={handleDeleteSelected}
        //             >
        //                 Delete Selected
        //             </button>
        //         )}
        //     </div>
        // </div>


        <section className="">
            <div className="container mx-auto px-4 mt-5">
                <div className="lg:pt-12 pt-6 w-full md:w-12/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                        <div className="px-4 py-5 flex-auto">
                            <div className='mt-2 mb-4 border flex justify-between p-5'>
                                <div> {selectedImages.length == 0 ? 'Ollyo Gallery' : (selectedImages.length == 1 ? ` ${selectedImages.length} File Selected` : `${selectedImages.length} Files Selected`)}</div>
                                <div>
                                    {selectedImages.length > 0 && (
                                        <p
                                            className=" text-red-500  px-4 font-semibold rounded ml-4 cursor-pointer"
                                            onClick={handleDeleteSelected}
                                        >
                                            {selectedImages.length == 1 ? 'Delete File' : 'Delete Files'}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className='mt-2 mb-4 border  p-3'>
                                <DndContext
                                    sensors={sensors}
                                    onDragStart={onDragStart}
                                    onDragEnd={onDragEnd}
                                // onDragOver={onDragOver}
                                >
                                    <div className="container mx-auto p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            <SortableContext items={imagesId}>
                                                {images.map((image, i) => (
                                                    <ImageContainer
                                                        key={image.id}
                                                        i={i}
                                                        image={image}
                                                        handleImageClick={handleImageClick}
                                                    />

                                                ))}

                                                <div
                                                    onClick={() => { createNewImage(); }}
                                                    className="border-dotted border-2 border-gray-300 sm:col-span-1 sm:row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1"
                                                >
                                                    <img src={add_pic} alt="add_image" 
                                                    className="w-full h-auto cursor-pointer"
                                                    />
                                                </div>

                                            </SortableContext>
                                        </div>
                                    </div>
                                </DndContext>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>




    );
};

export default ImageGallery;