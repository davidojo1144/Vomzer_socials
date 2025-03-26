import { useState, useRef } from 'react';
import { assets } from '../assets/assets';

const FeedsDisplay = ()=> {
  const [selectedImages, setSelectedImages] = useState([]);
  const [postContent, setPostContent] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setSelectedImages(prev => [...prev, ...filesArray]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = (index) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview); // Clean up memory
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <div className=' pt-16 md:pt-0'>
      <div className='flex items-center space-x-60 justify-between pl-5'>
        <h3 className='md:text-xl text-xs md:font-semibold'>Post & Feeds</h3>
        <img src={assets.star} alt="" />
      </div>
      <div className="border-t md:w-[100%] border-gray-300 my-7"></div>
      <p className='text-sm md:text-xl'>New Post</p>
      
      <div className='flex justify-normal items-center'>
        <img 
          className='absolute ml-5 mb-28 rounded-full w-10 h-10' 
          src={assets.profilepic} 
          alt="Profile" 
        />
        <textarea 
          className='w-full pt-5 text-sm h-44 border-2 border-gray-200 pl-20'  
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder='Whats on your mind ?'
        />
      </div>

      {/* Image upload section */}
      <div className="mt-4 pl-20">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
          multiple
        />
        
        {/* Image previews */}
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.preview}
                alt={`Preview ${index}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        {/* Upload button */}
        <button
          type="button"
          onClick={triggerFileInput}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
        >
          {selectedImages.length > 0 ? 'Add More Images' : 'Add Images'}
        </button>
      </div>

      {/* Post button */}
      <div className="mt-4 pl-20">
        <button
          className="py-2 px-10 text-white cursor-pointer text-sm bg-gradient-to-br from-blue-600 to-teal-500 rounded-full"
          disabled={!postContent && selectedImages.length === 0}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default FeedsDisplay


// import React from 'react'

// import { useState, useRef } from 'react';

// export default function ImageUpload() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setSelectedImage(URL.createObjectURL(file));
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-6">
//       {/* Hidden file input */}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         ref={fileInputRef}
//         className="hidden"
//       />
      
//       {/* Image preview or placeholder */}
//       <div 
//         onClick={triggerFileInput}
//         className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
//       >
//         {selectedImage ? (
//           <img 
//             src={selectedImage} 
//             alt="Preview" 
//             className="w-full h-full object-cover rounded-lg"
//           />
//         ) : (
//           <div className="text-center p-4">
//             <svg
//               className="w-12 h-12 mx-auto text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//             <p className="mt-2 text-sm text-gray-600">Click to upload an image</p>
//             <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
//           </div>
//         )}
//       </div>
      
//       {/* Upload button (alternative) */}
//       <button
//         type="button"
//         onClick={triggerFileInput}
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//       >
//         Choose Image
//       </button>
//     </div>
//   );
// }
