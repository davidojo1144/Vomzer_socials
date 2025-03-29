import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase.config';

const FeedsDisplay = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  
  // State management
  const [selectedImages, setSelectedImages] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeComment, setActiveComment] = useState({ postId: null, commentId: null });
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const fileInputRef = useRef(null);

  // Load saved posts on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('socialPosts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error('Error loading posts:', error);
        toast.error('Failed to load posts');
      }
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('socialPosts', JSON.stringify(posts));
  }, [posts]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      toast.success('Signed out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    try{
      if (e.target.files && e.target.files.length > 0) {
        const filesArray = Array.from(e.target.files).slice(0, 10).map(file => ({
          file,
          preview: URL.createObjectURL(file)
        }));
        setSelectedImages(filesArray);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      toast.error('Failed to select image');
    }
  };

  // Remove selected image
  const removeImage = (index) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  // Create new post
  const savePost = async () => {
    if (!postContent.trim() && selectedImages.length === 0) {
      toast.error('Please add content or images to post');
      return;
    }

    setIsPosting(true);

    try {
      let base64Images = [];
      
      // Process images if any are selected
      if (selectedImages.length > 0) {
        base64Images = await Promise.all(
          selectedImages.map(image => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target.result);
              reader.readAsDataURL(image.file);
            });
          })
        );
      }

      const newPost = {
        id: Date.now(),
        content: postContent,
        images: base64Images,
        timestamp: new Date().toISOString(),
        likes: 0,
        liked: false,
        comments: []
      };

      setPosts(prev => [newPost, ...prev]);
      setPostContent('');
      setSelectedImages([]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast.success('Posted successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setIsPosting(false);
    }
  };

  // Delete post
  const deletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
      toast.success('Post deleted successfully!');
    }
  };

  // Handle like/unlike
  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  // Add comment
  const addComment = (postId) => {
    if (!commentText.trim()) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              text: commentText,
              timestamp: new Date().toISOString(),
              replies: []
            }
          ]
        };
      }
      return post;
    }));

    setCommentText('');
    setActiveComment({ postId: null, commentId: null });
  };

  // Add reply
  const addReply = (postId, commentId) => {
    if (!replyText.trim()) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now(),
                    text: replyText,
                    timestamp: new Date().toISOString()
                  }
                ]
              };
            }
            return comment;
          })
        };
      }
      return post;
    }));

    setReplyText('');
    setActiveComment({ postId: null, commentId: null });
  };

  return (
    <div className="pt-16 md:w-[45%] w-full md:pt-0 pb-10 max-w-2xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <h3 className="text-xl font-semibold">Post & Feeds</h3>
        <div className="flex items-center gap-4">
          <img src={assets.logo} alt="Star icon" className="w-6 h-6" />
          <button 
            onClick={handleSignOut}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-300 my-4"></div>
      
      {/* New Post Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-start gap-3">
          <img src={assets.profilepic} alt="Profile" className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              rows="3"
            />
            
            {/* Image preview */}
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.preview}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded-lg"
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
            
            <div className="flex justify-between items-center mt-3">
              <div>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Photo ({selectedImages.length}/10)
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  key={selectedImages.length}
                />
              </div>
              
              <button
                onClick={savePost}
                disabled={(!postContent.trim() && selectedImages.length === 0) || isPosting}
                className={`px-4 py-2 rounded-full text-white ${(!postContent.trim() && selectedImages.length === 0) || isPosting ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'}`}
              >
                {isPosting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No posts yet. Be the first to post!
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Post header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={assets.profilepic} alt="Profile" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-medium">User</div>
                    <div className="text-xs text-gray-500">
                      {new Date(post.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
              
              {/* Post content */}
              {post.content && (
                <div className="px-4 pb-3">
                  <p className="whitespace-pre-line">{post.content}</p>
                </div>
              )}
              
              {/* Post images */}
              {post.images?.length > 0 && (
                <div className={`grid ${
                  post.images.length === 1 ? 'grid-cols-1' : 
                  post.images.length === 2 ? 'grid-cols-2' : 
                  'grid-cols-2 md:grid-cols-3'
                } gap-1 p-1`}>
                  {post.images.map((img, idx) => (
                    <div key={idx} className={`${
                      post.images.length === 3 && idx === 0 ? 'col-span-2 row-span-2 h-64' : 'h-48'
                    }`}>
                      <img
                        src={img}
                        alt={`Post ${idx}`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Post stats */}
              <div className="px-4 py-2 border-t border-b border-gray-100 flex justify-between text-sm text-gray-500">
                <span>{post.likes} {post.likes === 1 ? 'like' : 'likes'}</span>
                <span>{post.comments?.length || 0} {post.comments?.length === 1 ? 'comment' : 'comments'}</span>
              </div>
              
              {/* Post actions */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex-1 py-2 flex items-center justify-center gap-1 ${post.liked ? 'text-teal-500' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={post.liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Like
                </button>
                <button
                  onClick={() => setActiveComment({ postId: post.id, commentId: null })}
                  className="flex-1 py-2 flex items-center justify-center gap-1 text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Comment
                </button>
              </div>
              
              {/* Comments section */}
              <div className="p-4 space-y-4">
                {/* Add comment */}
                {activeComment.postId === post.id && activeComment.commentId === null && (
                  <div className="flex gap-2">
                    <img src={assets.profilepic} alt="Profile" className="w-8 h-8 rounded-full" />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => addComment(post.id)}
                        disabled={!commentText.trim()}
                        className="px-3 py-1 bg-teal-500 text-white rounded-full text-sm disabled:opacity-50"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Comments list */}
                {post.comments?.map(comment => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex gap-2">
                      <img src={assets.profilepic} alt="Profile" className="w-8 h-8 rounded-full" />
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-2">
                          <div className="font-medium text-sm">User</div>
                          <div className="text-sm">{comment.text}</div>
                        </div>
                        <div className="flex gap-3 text-xs text-gray-500 mt-1 ml-2">
                          <span>{new Date(comment.timestamp).toLocaleTimeString()}</span>
                          <button 
                            onClick={() => setActiveComment({ postId: post.id, commentId: comment.id })}
                            className="hover:text-gray-700"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Replies */}
                    {comment.replies?.map(reply => (
                      <div key={reply.id} className="flex gap-2 ml-10">
                        <img src={assets.profilepic} alt="Profile" className="w-8 h-8 rounded-full" />
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="font-medium text-sm">User</div>
                            <div className="text-sm">{reply.text}</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1 ml-2">
                            {new Date(reply.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add reply */}
                    {activeComment.postId === post.id && activeComment.commentId === comment.id && (
                      <div className="flex gap-2 ml-10">
                        <img src={assets.profilepic} alt="Profile" className="w-8 h-8 rounded-full" />
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => addReply(post.id, comment.id)}
                            disabled={!replyText.trim()}
                            className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm disabled:opacity-50"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedsDisplay;