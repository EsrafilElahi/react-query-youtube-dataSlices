import { useQuery, useMutation, useQueryClient } from 'react-query';

function Videos() {
  const { data, isLoading, error } = useQuery('videos', fetchVideos);

  // ...

  return (
    // ...
  );
}

function fetchVideos() {
  // Fetch videos from the server
}

function CreateVideo() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createVideo, {
    onSuccess: (newVideo) => {
      queryClient.setQueryData('videos', (oldData) => [...oldData, newVideo]);
    },
  });

  const handleCreateVideo = () => {
    const newVideo = { title: 'New Video', description: 'Lorem ipsum dolor sit amet' };

    // Optimistic update: Update the UI immediately before the server responds
    queryClient.setQueryData('videos', (oldData) => [...oldData, newVideo]);

    mutate(newVideo, {
      // Rollback the optimistic update if the mutation fails
      onError: () => queryClient.invalidateQueries('videos'),
    });
  };

  return (
    <div>
      <h2>Create Video</h2>
      <button onClick={handleCreateVideo}>Create</button>
    </div>
  );
}

function createVideo(videoData) {
  // Create video on the server
}

function DeleteVideo({ videoId }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteVideo, {
    onSuccess: () => {
      queryClient.invalidateQueries('videos');
    },
  });

  const handleDeleteVideo = () => {
    mutate(videoId);
  };

  return (
    <div>
      <h2>Delete Video</h2>
      <button onClick={handleDeleteVideo}>Delete</button>
    </div>
  );
}

function deleteVideo(videoId) {
  // Delete video on the server
}


// In this continuation, we add the DeleteVideo component to handle video deletion. Inside the DeleteVideo component, we use the useMutation hook to handle the delete operation. When the handleDeleteVideo function is called, the mutate function triggers the delete operation, and on success, it invalidates the 'videos' query, causing it to refetch fresh data.