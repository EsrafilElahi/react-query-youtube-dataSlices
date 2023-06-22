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
      <button onClick={handleCreateVideo}>Create</button>
    </div>
  );
}

function createVideo(videoData) {
  // Create video on the server
}

function VideoList() {
  const queryClient = useQueryClient();

  const handlePrefetchVideos = () => {
    queryClient.prefetchQuery('videos', fetchVideos);
  };

  return (
    <div>
      <h2>Video List</h2>
      <button onClick={handlePrefetchVideos}>Prefetch Videos</button>
    </div>
  );
}


// In this example, we introduce a new component called VideoList, which includes a button to prefetch the videos. When the button is clicked, the handlePrefetchVideos function is called. Inside this function, we use queryClient.prefetchQuery('videos', fetchVideos) to proactively fetch the videos and populate the cache.

// The prefetchQuery function takes two arguments: the key of the query ('videos' in this case) and the function to fetch the data (fetchVideos in this case). It fetches the data in the background and stores it in the cache without rendering any UI components. This can be useful when you anticipate that certain data will be needed soon and want to ensure a smooth user experience by reducing data-fetching delays.