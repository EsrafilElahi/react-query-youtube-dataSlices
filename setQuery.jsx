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


// In this continuation, we add the DeleteVideo component to handle video deletion. Inside the DeleteVideo component, 
// we use the useMutation hook to handle the delete operation. When the handleDeleteVideo function is called, the mutate function triggers the delete operation, and on success, 
// it invalidates the 'videos' query, causing it to refetch fresh data.


// =============================================
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

      // Invalidate the pagination query to refetch the updated data
      queryClient.invalidateQueries('videos', { exact: false });
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

function VideosPagination() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery('videos', fetchVideos, {
    // Pagination options
    initialData: [], // Provide initial empty data
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  const handleLoadMore = () => {
    queryClient.prefetchQuery('videos', fetchVideos, {
      // Pagination options
      staleTime: 0, // Disable caching for prefetch
    });
  };

  return (
    <div>
      <h2>Videos Pagination</h2>
      {data.map((video) => (
        // Render video items
      ))}
      <button onClick={handleLoadMore} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}


// In this continuation, we introduce the VideosPagination component to demonstrate pagination using React Query. We use the useQuery hook to fetch videos with pagination options. The initialData option is set to an empty array to provide an initial value before the data is fetched. We also enable keepPreviousData to retain the previous data while fetching new data, ensuring a smooth UI experience during pagination.

// * important
// In summary, "invalidateQueries" is used to mark a query as stale, triggering a refetch from the server, 
// while "setQueryData" is used to manually update the cache with new data, providing an optimistic update to the UI. Both functions have different purposes and effects, and you can use them together to manage the query cache and keep the UI in sync with the server data.


// ====================================================
import { useQuery, useMutation, useQueryClient } from 'react-query';

function Videos() {
  const { data, isLoading, error } = useQuery('videos', fetchVideos, {
    refetchInterval: 5000, // Automatically refetch every 5 seconds
  });

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

      // Invalidate the pagination query to refetch the updated data
      queryClient.invalidateQueries('videos', { exact: false });
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

function VideosPagination() {
  const queryClient = useQueryClient();
  const { data, isLoading, error, isFetchingNextPage, fetchNextPage } = useQuery('videos', fetchVideos, {
    // Pagination options
    initialData: [], // Provide initial empty data
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <div>
      <h2>Videos Pagination</h2>
      {data.pages.map((page) =>
        page.map((video) => (
          // Render video items
        ))
      )}
      <button onClick={handleLoadMore} disabled={isLoading || isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}

// Automatic Query Refetching: In the Videos component, we set the refetchInterval option to 5000 (5 seconds). This enables automatic refetching of the 'videos' query every 5 seconds, ensuring the data stays up to date.

// Pagination with fetchNextPage: In the VideosPagination component, we use the fetchNextPage function to fetch the next page of videos. This function is provided by React Query and automatically handles pagination, updating the query with the new page of data.

// Rendering Paginated Data: We access the data.pages array in the VideosPagination component to iterate over each page and render the video items. This allows us to handle paginated data seamlessly.

// Showing Loading State: We use the isLoading and isFetchingNextPage flags to control the "Load More" button's disabled and loading state, providing a visual indication when the next page is being fetched.