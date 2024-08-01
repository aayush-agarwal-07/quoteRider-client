import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        setFormData(data.posts[0]);
        setPublishError(null);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-6 max-w-4xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row sm:gap-6'>
          <input
            type='text'
            placeholder='Title'
            required
            id='title'
            className='border border-gray-300 rounded-md p-2 flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title || ''}
          />
        </div>
        <div className='flex flex-col gap-4 items-center border-4 border-teal-500 border-dotted p-4'>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
            className='mb-4'
          />
          <button
            type='button'
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
            className='bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-md flex items-center'
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </button>
        </div>
        {imageUploadError && (
          <div className='bg-red-100 border border-red-400 text-red-700 rounded p-3'>
            {imageUploadError}
          </div>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt='Uploaded'
            className='w-full h-72 object-cover mt-4'
          />
        )}
        <ReactQuill
          theme='snow'
          value={formData.content || ''}
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <button
          type='submit'
          className='bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md'
        >
          Update Post
        </button>
        {publishError && (
          <div className='bg-red-100 border border-red-400 text-red-700 rounded p-3 mt-5'>
            {publishError}
          </div>
        )}
      </form>
    </div>
  );
}
