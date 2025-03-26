import { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';

const FeedsDisplay = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const fileInputRef = useRef(null);

  
  useEffect(() => {
    const savedPosts = localStorage.getItem('socialPosts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(parsedPosts);
      } catch (error) {
        console.error('Error parsing saved posts:', error);
      }
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setSelectedImages(prev => [...prev, ...filesArray]);
    }
  };

  const savePost = () => {
    if (!postContent && selectedImages.length === 0) return;

  
    const imageReaders = selectedImages.map(image => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(image.file);
      });
    });

    Promise.all(imageReaders).then(base64Images => {
      const newPost = {
        id: Date.now(),
        content: postContent,
        images: base64Images, 
        timestamp: new Date().toISOString()
      };

      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('socialPosts', JSON.stringify(updatedPosts));

      
      setPostContent('');
      setSelectedImages([]);
      
      
      selectedImages.forEach(img => URL.revokeObjectURL(img.preview));
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = (index) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('socialPosts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="pt-16 md:pt-0 pb-10">
      <div className="flex items-center space-x-60 justify-between pl-5">
        <h3 className="md:text-xl text-xs md:font-semibold">Post & Feeds</h3>
        <img src={assets.star} alt="" />
      </div>
      
      <div className="border-t md:w-[100%] border-gray-300 my-7"></div>
      
      {/* New Post Section */}
      <div className="mb-8">
        <p className="text-sm md:text-xl pl-5">New Post</p>
        
        <div className="flex justify-normal items-center">
          <img 
            className="absolute ml-5 mb-28 rounded-full w-10 h-10" 
            src={assets.profilepic} 
            alt="Profile" 
          />
          <textarea 
            className="w-full pt-5 text-sm h-44 border-2 border-gray-200 pl-20"  
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Whats on your mind ?"
          />
        </div>

        {/* Image upload section */}
        <div className="mt-4 pl-20">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
            multiple
          />
          
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
            className={`py-2 px-10 text-white cursor-pointer text-sm bg-gradient-to-br from-blue-600 to-teal-500 rounded-full ${
              (!postContent && selectedImages.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={savePost}
            disabled={!postContent && selectedImages.length === 0}
          >
            Post
          </button>
        </div>
      </div>

      {/* Display saved posts */}
      <div className="mt-8 pl-5 pr-5">
        <h3 className="text-lg font-semibold mb-4">Your Posts</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Create your first post!</p>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow relative">
                <button
                  onClick={() => deletePost(post.id)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
                <div className="flex items-center mb-3">
                  <img 
                    src={assets.profilepic} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-gray-500 text-sm">
                    {new Date(post.timestamp).toLocaleString()}
                  </span>
                </div>
                {post.content && <p className="mb-3">{post.content}</p>}
                {post.images && post.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Post image ${idx}`}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100'; // Fallback image
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedsDisplay;