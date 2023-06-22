// ============================ get videos ================================
import { useQuery } from 'react-query';

function Videos() {
  const { data, isLoading, error } = useQuery('videos', fetchVideos);
  
  if (isLoading) {
    return <div>Loading videos...</div>;
  }
  
  if (error) {
    return <div>Error fetching videos: {error.message}</div>;
  }
  
  return (
    <div>
      <h1>Videos</h1>
      {data.videos.map(video => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
}

function fetchVideos() {
  return fetch('/api/videos').then(response => response.json());
}

// ============================ mutation videos ================================
// create videos
import { useMutation, useQueryClient } from 'react-query';

function CreateVideo() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries('videos');
    },
  });

  const handleCreateVideo = () => {
    mutate({ title: 'New Video', description: 'Lorem ipsum dolor sit amet' });
  };

  return (
    <div>
      <h2>Create Video</h2>
      <button onClick={handleCreateVideo} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create'}
      </button>
    </div>
  );
}

function createVideo(videoData) {
  return fetch('/api/videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(videoData),
  }).then(response => response.json());
}

// update videos
import { useMutation, useQueryClient } from 'react-query';

function EditVideo({ videoId }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updatedVideo => updateVideo(videoId, updatedVideo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['videos', videoId]);
    },
  });

  const handleUpdateVideo = () => {
    mutate({ title: 'Updated Video', description: 'New description' });
  };

  return (
    <div>
      <h2>Edit Video</h2>
      <button onClick={handleUpdateVideo} disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update'}
      </button>
    </div>
  );
}

function updateVideo(videoId, updatedVideoData) {
  return fetch(`/api/videos/${videoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedVideoData),
  }).then(response => response.json());
}

// delete videos
import { useMutation, useQueryClient } from 'react-query';

function DeleteVideo({ videoId }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['videos', videoId]);
    },
  });

  const handleDeleteVideo = () => {
    mutate();
  };

  return (
    <div>
      <h2>Delete Video</h2>
      <button onClick={handleDeleteVideo} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}

function deleteVideo(videoId) {
  return fetch(`/api/videos/${videoId}`, {
    method: 'DELETE',
  }).then(response => response.json());
}


// The line of code queryClient.invalidateQueries('videos') is used to invalidate (or mark as stale) a specific query or set of queries in the queryClient cache.
// When a query is invalidated, it means that the cached data for that query becomes outdated or invalid, and the next time the query is executed, 
// it will trigger a fresh data fetch from the server.